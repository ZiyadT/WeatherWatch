import React, {Component} from 'react'
import Card from '../components/Card'
import Overlay from '../components/Overlay'
import './Dashboard.css'

export default class Dashboard extends Component {
    state = {
        relevantCities: null,
        searchCity: '',
        latitude: '',
        longitude: '',
        cityError: false,
        coordError: false,
        currentCity: null,
        newCity: true,
        cards: []
    }

    async componentDidMount() {
        try {
            let displayCards = this.state.cards
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
            this.setState({cards: displayCards})
          } catch (err) {
            console.error("ERROR:", err)
          }
    }

    addCard = async () => {
        try {
            let jwt = localStorage.getItem('token')
            let fetchResponse = await fetch("/api/cities/create", {
              method: "POST",
              headers: { "Content-Type": "application/json", "Authorization": 'Bearer: ' + jwt },
              body: JSON.stringify({ city: this.state.currentCity })
            });
            let serverResponse = await fetchResponse.json()
            console.log("Success:", serverResponse)
            let cur = this.state.currentCity
            cur.mongoId = serverResponse._id
            let displayCards = this.state.cards
            displayCards.push(cur)
            console.log(cur)
            this.setState({ currentCity: null, cards: displayCards })
        } catch (err) {
            console.error("Error:", err)
        }
    }

    delCard = async(card) => {
        try {
            console.log(card)
            let jwt = localStorage.getItem('token')
            let fetchResponse = await fetch("/api/cities/del", {
              method: "DELETE",
              headers: { "Content-Type": "application/json", "Authorization": 'Bearer: ' + jwt },
              body: JSON.stringify({ city: card })
            });
            let serverResponse = await fetchResponse.json()
            console.log("Success:", serverResponse)
            let displayCards = this.state.cards
            let index = displayCards.indexOf(card)
            displayCards.splice(index, 1)
            this.setState({ cards: displayCards })
        } catch (err) {
            console.error("Error:", err)
        }
    }

    nullCity = () => {
        this.setState({currentCity: null, newCity: true})
    }

    makeCurrent = (city, nw = true) => {
        this.setState({currentCity: city, newCity: nw})
    }

    citySearch = async (e) => {
        e.preventDefault()
        let jwt = localStorage.getItem('token')
        const fetchResponse = await fetch('/api/cities/city_search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": 'Bearer: ' + jwt },
            body: JSON.stringify({name: this.state.searchCity})
          })
        if(!fetchResponse.ok){
            this.setState({ cityError: true})
        }
        else{
            const data = await fetchResponse.json()
            const data_parsed = JSON.parse(data)
            this.setState({currentCity: data_parsed, cityError: false})
        } 
        
    }

    coordSearch = async (e) => {
        e.preventDefault()
        let jwt = localStorage.getItem('token')
        const fetchResponse = await fetch('/api/cities/coord_search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": 'Bearer: ' + jwt },
            body: JSON.stringify({lat: this.state.latitude, lon: this.state.longitude})
          })
        if(!fetchResponse.ok){
            this.setState({ coordError: true})
        }
        else{
            const data = await fetchResponse.json()
            const data_parsed = JSON.parse(data)
            this.setState({currentCity: data_parsed, coordError: false})
        }
    }

    handleChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value});
    }

    handleLogOut = async () => {
        localStorage.removeItem('token')
        this.props.setUserInState(null)
    }

    render() {
        return(
            <main className='Dashboard h-screen'>
                <div className="flex justify-between h-28 border-b-2 border-black">
                    <h1 className='text-5xl font-bold mx-24 my-auto text-slate-300'>WeatherWatch</h1>
                    <div className='my-auto flex'>
                        <h3 className='mx-12 p-2 text-slate-300 font-semibold text-lg'>Hello, {this.props.user.name}</h3>
                        <h3 className='mr-24 p-2 text-slate-300 font-semibold text-lg cursor-pointer hover:text-orange-300' onClick={this.handleLogOut}>Sign Out</h3>
                    </div>
                </div>
                <div className="flex">
                    {this.state.currentCity ? <Overlay currentCity={this.state.currentCity} newCity={this.state.newCity} addCard={this.addCard} nullCity={this.nullCity} /> : ""}
                    <form autoComplete="off" onSubmit={this.citySearch} className="w-1/2">
                        <label className="text-lg font-semibold text-slate-300">CITY</label>
                        <input name="searchCity" type="text" autoComplete="off" className="ml-3 mr-12 mt-12 bg-cyan-300 w-1/2 h-8 px-2" onChange={this.handleChange} required></input>
                        <button className="text-lg font-bold text-orange-300 hover:text-rose-500" type="submit">SEARCH</button>
                    </form>
                    <form autoComplete="off" onSubmit={this.coordSearch} className="w-1/2">
                        <label className="text-lg font-semibold text-slate-300">LAT</label>
                        <input name="latitude" type="text" className="mx-3 mt-12 bg-cyan-300 w-24 h-8 px-2" onChange={this.handleChange} required></input>
                        <label className="text-lg font-semibold text-slate-300">LON</label>
                        <input name="longitude" type="text" className="ml-3 mr-12 mt-12 bg-cyan-300 w-24 h-8 px-2" onChange={this.handleChange} required></input>
                        <button className="text-lg font-bold text-orange-300 hover:text-rose-500" type="submit">SEARCH</button>
                    </form>
                </div>
                <div className='w-2/3 mx-auto my-4'>
                    <p id="error-city" className={this.state.cityError ? "block" : "hidden"}>City not found</p>
                    <p id="error-coord" className={this.state.coordError ? "block" : "hidden"}>Invalid coordinates</p>
                </div>
                <div className='inline-block w-4/5 mx-auto my-8 text-left'>
                    {this.state.cards.map((card) => (
                        <Card object={card} makeCurrent={this.makeCurrent} delCard={this.delCard} />
                    ))}
                </div>
            </main>
        )
    }
}