import React, {useState, useEffect} from 'react'
import Card from '../components/Card'
import Overlay from '../components/Overlay'
import './Dashboard.css'

export default function Dashboard(props){
    const [searchCity, setSearchCity] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [cityError, setCityError] = useState(false)
    const [coordError, setCoordError] = useState(false)
    const [currentCity, setCurrentCity] = useState(null)
    const [newCity, setNewCity] = useState(true)
    const [cards, setCards] = useState([])
    
    useEffect(() => {
        async function fetchData(){
            try {
                let displayCards = cards
                let jwt = localStorage.getItem('token')
                let fetchCoordsResponse = await fetch("/api/cities/get", {
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Authorization": 'Bearer: ' + jwt }
                })
                let coords = await fetchCoordsResponse.json()
                for (let i = 0; i < coords.length; i++){
                    const fetchResponse = await fetch('/api/cities/coord_search', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', "Authorization": 'Bearer: ' + jwt },
                        body: JSON.stringify({lat: coords[i].lat, lon: coords[i].lon})
                      })
                    if(!fetchResponse.ok) throw new Error('Fetch Failed - Bad Request ' + fetchResponse.status)
                    const data = await fetchResponse.json()
                    const data_parsed = JSON.parse(data)
                    data_parsed.mongoId = coords[i]._id
                    displayCards.push(data_parsed)
                }
                console.log("useEffect called", displayCards)
                setCards([...displayCards])
              } catch (err) {
                console.error("ERROR:", err)
              }
        }
        fetchData()
    }, [])

    const addCard = async () => {
        try {
            let jwt = localStorage.getItem('token')
            let fetchResponse = await fetch("/api/cities/create", {
              method: "POST",
              headers: { "Content-Type": "application/json", "Authorization": 'Bearer: ' + jwt },
              body: JSON.stringify({ city: currentCity })
            });
            let serverResponse = await fetchResponse.json()
            console.log("Success:", serverResponse)
            let cur = currentCity
            cur.mongoId = serverResponse._id
            let displayCards = cards
            displayCards.push(cur)
            setCurrentCity(null)
            setCards(displayCards)
        } catch (err) {
            console.error("Error:", err)
        }
    }

    const delCard = async(card) => {
        try {
            let jwt = localStorage.getItem('token')
            let fetchResponse = await fetch("/api/cities/del", {
              method: "DELETE",
              headers: { "Content-Type": "application/json", "Authorization": 'Bearer: ' + jwt },
              body: JSON.stringify({ city: card })
            });
            let serverResponse = await fetchResponse.json()
            console.log("Success:", serverResponse)
            let displayCards = cards
            let index = displayCards.indexOf(card)
            displayCards.splice(index, 1)
            setCards([...displayCards])
        } catch (err) {
            console.error("Error:", err)
        }
    }

    const nullCity = () => {
        setCurrentCity(null)
        setNewCity(true)
    }

    const makeCurrent = (city, nw = true) => {
        setCurrentCity(city)
        setNewCity(nw)
    }

    const citySearch = async (e) => {
        e.preventDefault()
        let jwt = localStorage.getItem('token')
        const fetchResponse = await fetch('/api/cities/city_search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": 'Bearer: ' + jwt },
            body: JSON.stringify({name: searchCity})
          })
        if(!fetchResponse.ok){
            setCityError(true)
        }
        else{
            const data = await fetchResponse.json()
            const data_parsed = JSON.parse(data)
            setCurrentCity(data_parsed)
            setCityError(false)
        } 
        
    }

    const coordSearch = async (e) => {
        e.preventDefault()
        let jwt = localStorage.getItem('token')
        const fetchResponse = await fetch('/api/cities/coord_search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": 'Bearer: ' + jwt },
            body: JSON.stringify({lat: latitude, lon: longitude})
          })
        if(!fetchResponse.ok){
            setCoordError(true)
        }
        else{
            const data = await fetchResponse.json()
            const data_parsed = JSON.parse(data)
            setCurrentCity(data_parsed)
            setCoordError(false)
        }
    }

    const handleCityChange = (evt) => {
        setSearchCity(evt.target.value);
    }
    const handleLatChange = (evt) => {
        setLatitude(evt.target.value);
    }
    const handleLonChange = (evt) => {
        setLongitude(evt.target.value);
    }

    const handleLogOut = async () => {
        localStorage.removeItem('token')
        props.setUserInState(null)
    }

    return(
        <main className='Dashboard h-screen'>
            <div className="block h-28 border-b-2 border-black sm:flex sm:justify-between">
                <h1 className='text-5xl font-bold mx-auto my-auto text-slate-300 sm:mx-24'>WeatherWatch</h1>
                <div className='my-auto flex justify-center'>
                    <h3 className='p-2 text-slate-300 font-semibold text-lg sm:mx-5'>Hello, {props.user.name}</h3>
                    <h3 className='p-2 text-slate-300 font-semibold text-lg cursor-pointer hover:text-orange-300 sm:mx-5' onClick={handleLogOut}>Sign Out</h3>
                </div>
            </div>
            <div className="sm:flex">
                {currentCity ? <Overlay currentCity={currentCity} newCity={newCity} addCard={addCard} nullCity={nullCity} /> : ""}
                <form autoComplete="off" onSubmit={citySearch} className="w-4/5 mx-auto">
                    <label className="text-lg font-semibold text-slate-300">CITY</label>
                    <input name="searchCity" type="text" autoComplete="off" className="ml-3 mr-12 mt-12 bg-cyan-300 w-1/2 h-8 px-2" onChange={handleCityChange} required></input>
                    <button className="text-lg font-bold text-orange-300 hover:text-rose-500" type="submit">SEARCH</button>
                </form>
                <form autoComplete="off" onSubmit={coordSearch} className="w-full mx-auto">
                    <label className="text-lg font-semibold text-slate-300">LAT</label>
                    <input name="latitude" type="text" className="mx-3 mt-12 bg-cyan-300 w-24 h-8 px-2" onChange={handleLatChange} required></input>
                    <label className="text-lg font-semibold text-slate-300">LON</label>
                    <input name="longitude" type="text" className="ml-3 mr-12 mt-12 bg-cyan-300 w-24 h-8 px-2" onChange={handleLonChange} required></input>
                    <button className="text-lg font-bold text-orange-300 hover:text-rose-500" type="submit">SEARCH</button>
                </form>
            </div>
            <div className='w-2/3 mx-auto my-4'>
                <p id="error-city" className={cityError ? "block" : "hidden"}>City not found</p>
                <p id="error-coord" className={coordError ? "block" : "hidden"}>Invalid coordinates</p>
            </div>
            <div className='grid grid-cols-1 gap-y-4 w-1/2 mx-auto my-8 sm:text-left sm:grid sm:gap-x-4 sm:gap-y-2 sm:grid-cols-5 sm:w-4/5'>
                {cards.map((card) => (
                    <Card object={card} makeCurrent={makeCurrent} delCard={delCard} />
                ))}
            </div>
        </main>
    )
}