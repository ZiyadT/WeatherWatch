import React, {Component} from 'react'
import Card from '../components/Card'
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

    // let curCards = this.state.cards
        // if (!curCards.includes(this.state.currentCity))
        //     curCards.push(this.state.currentCity)
        // this.setState({cards: curCards, currentCity: null})

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

    // let curCards = this.state.cards
        // const index = curCards.indexOf(card)
        // curCards.splice(index, 1)
        // this.setState({cards: curCards})

    nullCity = () => {
        this.setState({currentCity: null})
    }

    makeCurrent = (city) => {
        this.setState({currentCity: city})
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
                    <div className='my-auto'>
                        <h3 className='mx-24 p-2 text-slate-300 font-semibold text-lg cursor-pointer hover:text-orange-300' onClick={this.handleLogOut}>Sign Out</h3>
                    </div>
                </div>
                <div className="flex">
                    <div id="overlay" className={this.state.currentCity ? "block" : "hidden"}>
                        <div id="inner-overlay" className="bg-amber-300">
                            <div className="flex justify-between">
                                <p className="mt-10 mx-10 text-4xl font-bold">{this.state.currentCity ? (this.state.currentCity.name ? this.state.currentCity.name + ', ' + this.state.currentCity.sys.country : "Unnamed") : ''}</p>
                                <p className="mt-10 mx-10 text-4xl font-bold">{this.state.currentCity ? Math.round((this.state.currentCity.main.temp*100 - 27315)/100) : ''}°C</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="mx-10 mt-5 text-xl font-bold">{this.state.currentCity ? this.state.currentCity.weather[0].description : ''}</p>
                                <p className="mx-10 mt-5 text-xl font-bold">Feels like {this.state.currentCity ? Math.round((this.state.currentCity.main.feels_like*100 - 27315)/100) : ''}°C</p>
                            </div>
                            <div className="w-4/5 h-1/2 mx-auto my-12">
                                <div className="flex justify-between">
                                    <p className="mx-10 mt-4 text-xl font-bold">Max</p>
                                    <p className="mx-10 mt-4 text-xl font-bold">{this.state.currentCity ? Math.round((this.state.currentCity.main.temp_max*100 - 27315)/100) : ''}°C</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="mx-10 mt-4 text-xl font-bold">Min</p>
                                    <p className="mx-10 mt-4 text-xl font-bold">{this.state.currentCity ? Math.round((this.state.currentCity.main.temp_min*100 - 27315)/100) : ''}°C</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="mx-10 mt-4 text-xl font-bold">Wind</p>
                                    <p className="mx-10 mt-4 text-xl font-bold">{this.state.currentCity ? this.state.currentCity.wind.speed : ''} m/s</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="mx-10 mt-4 text-xl font-bold">Humidity</p>
                                    <p className="mx-10 mt-4 text-xl font-bold">{this.state.currentCity ? this.state.currentCity.main.humidity : ''}%</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="mx-10 mt-4 text-xl font-bold">Pressure</p>
                                    <p className="mx-10 mt-4 text-xl font-bold">{this.state.currentCity ? this.state.currentCity.main.pressure : ''} hPa</p>
                                </div>
                                <button className="my-10 border border-black rounded p-1 bg-cyan-600 font-semibold mx-3" onClick={this.addCard}>Add to Dashboard</button>
                                <button className="my-10 border border-black rounded p-1 bg-red-600 font-semibold mx-3" onClick={this.nullCity}>Close</button>
                            </div>
                        </div>
                    </div>
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
                {/* className={this.state.cityError ? "block" : "hidden"} */}
                <div className='inline-block w-4/5 mx-auto my-8 text-left'>
                    {this.state.cards.map((card) => (
                        <Card object={card} makeCurrent={this.makeCurrent} delCard={this.delCard} />
                    ))}
                </div>
            </main>
        )
    }
}