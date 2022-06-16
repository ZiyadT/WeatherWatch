import React, {Component} from 'react'
import Card from '../components/Card'
import './Dashboard.css'

export default class Dashboard extends Component {
    state = {
        relevantCities: null,
        searchCity: '',
        latitude: '',
        longitude: '',
        currentCity: null,
        cards: []
    }

    async componentDidMount() {
        try {
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
                let displayCards = this.state.cards
                displayCards.push(data_parsed)
                this.setState({cards: displayCards})
            }
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
            let displayCards = this.state.cards
            displayCards.push(this.state.currentCity)
            this.setState({ currentCity: null, cards: displayCards })
        } catch (err) {
            console.error("Error:", err)
        }
    };

    // let curCards = this.state.cards
        // if (!curCards.includes(this.state.currentCity))
        //     curCards.push(this.state.currentCity)
        // this.setState({cards: curCards, currentCity: null})

    delCard = async(card) => {
        try {
            let jwt = localStorage.getItem('token')
            let fetchResponse = await fetch("/api/cities/del", {
              method: "POST",
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
        if(!fetchResponse.ok) throw new Error('Fetch Failed - Bad Request ' + fetchResponse.status)
        const data = await fetchResponse.json()
        const data_parsed = JSON.parse(data)
        this.setState({currentCity: data_parsed})
    }

    coordSearch = async (e) => {
        e.preventDefault()
        let jwt = localStorage.getItem('token')
        const fetchResponse = await fetch('/api/cities/coord_search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": 'Bearer: ' + jwt },
            body: JSON.stringify({lat: this.state.latitude, lon: this.state.longitude})
          })
        if(!fetchResponse.ok) throw new Error('Fetch Failed - Bad Request ' + fetchResponse.status)
        const data = await fetchResponse.json()
        const data_parsed = JSON.parse(data)
        this.setState({currentCity: data_parsed})
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
                        <input name="searchCity" type="text" autoComplete="off" className="ml-3 mr-12 my-12 bg-cyan-300 w-1/2 h-8 px-2" onChange={this.handleChange} required></input>
                        <button className="text-lg font-bold text-orange-300 hover:text-rose-500" type="submit">SEARCH</button>
                    </form>
                    <form autoComplete="off" onSubmit={this.coordSearch} className="w-1/2">
                        <label className="text-lg font-semibold text-slate-300">LAT</label>
                        <input name="latitude" type="text" className="mx-3 my-12 bg-cyan-300 w-24 h-8 px-2" onChange={this.handleChange} required></input>
                        <label className="text-lg font-semibold text-slate-300">LON</label>
                        <input name="longitude" type="text" className="ml-3 mr-12 my-12 bg-cyan-300 w-24 h-8 px-2" onChange={this.handleChange} required></input>
                        <button className="text-lg font-bold text-orange-300 hover:text-rose-500" type="submit">SEARCH</button>
                    </form>
                </div>
                <div className='inline-block w-4/5 mx-auto my-8 text-left'>
                    {this.state.cards.map((card) => (
                        <Card object={card} makeCurrent={this.makeCurrent} delCard={this.delCard}/>
                    ))}
                </div>
            </main>
        )
    }
}