import { Component } from 'react'

export default class Card extends Component {
    getColor = () => {
        // if block for card color
        if (Math.round((this.props.object.main.temp*100 - 27315)/100) > 0 && Math.round((this.props.object.main.temp*100 - 27315)/100) < 10)
            return 'bg-blue-300 rounded-2xl w-52 mx-10 my-3 inline-block hover: cursor-default'
        else if (Math.round((this.props.object.main.temp*100 - 27315)/100) >= 10 && Math.round((this.props.object.main.temp*100 - 27315)/100) < 20)
            return'bg-amber-300 rounded-2xl w-52 mx-10 my-3 inline-block hover: cursor-default'
        else if (Math.round((this.props.object.main.temp*100 - 27315)/100) >= 20 && Math.round((this.props.object.main.temp*100 - 27315)/100) < 30)
            return 'bg-orange-500 rounded-2xl w-52 mx-10 my-3 inline-block hover: cursor-default'
        else if (Math.round((this.props.object.main.temp*100 - 27315)/100) >= 30)
            return 'bg-red-500 rounded-2xl w-52 mx-10 my-3 inline-block hover: cursor-default'
        else
            return 'bg-slate-200 rounded-2xl w-52 mx-10 my-3 inline-block hover: cursor-default'
    }

    getEmoji = () => {
        if (this.props.object.weather[0].main === 'Thunderstorm')
            return '🌩️'
        else if (this.props.object.weather[0].main === 'Drizzle')
            return '💧'
        else if (this.props.object.weather[0].main === 'Rain')
            return '🌧️'
        else if (this.props.object.weather[0].main === 'Snow')
            return '🌨️'
        else if (this.props.object.weather[0].main === 'Mist' || this.props.object.weather[0].main === 'Smoke' || this.props.object.weather[0].main === 'Dust' || this.props.object.weather[0].main === 'Haze' || this.props.object.weather[0].main === 'Fog' || this.props.object.weather[0].main === 'Sand' || this.props.object.weather[0].main === 'Squall')
            return '🌫️'
        else if (this.props.object.weather[0].main === 'Ash')
            return '🌋'
        else if (this.props.object.weather[0].main === 'Tornado')
            return '🌪️'
        else if (this.props.object.weather[0].main === 'Clear')
            return '☀️'
        else
            return '☁️'
    }

    // componentDidMount() {
    //     let em = '☁️'
    //     let col = 'bg-slate-200 rounded-2xl w-52 mx-10 my-3 inline-block hover: cursor-default'
    //     // if block for card color
    //     if (Math.round((this.props.object.main.temp*100 - 27315)/100) > 0 && Math.round((this.props.object.main.temp*100 - 27315)/100) < 10)
    //         col = 'bg-blue-300 rounded-2xl w-52 mx-10 my-3 inline-block hover: cursor-default'
    //     else if (Math.round((this.props.object.main.temp*100 - 27315)/100) >= 10 && Math.round((this.props.object.main.temp*100 - 27315)/100) < 20)
    //         col = 'bg-amber-300 rounded-2xl w-52 mx-10 my-3 inline-block hover: cursor-default'
    //     else if (Math.round((this.props.object.main.temp*100 - 27315)/100) >= 20 && Math.round((this.props.object.main.temp*100 - 27315)/100) < 30)
    //         col = 'bg-orange-500 rounded-2xl w-52 mx-10 my-3 inline-block hover: cursor-default'
    //     else if (Math.round((this.props.object.main.temp*100 - 27315)/100) >= 30)
    //         col = 'bg-red-500 rounded-2xl w-52 mx-10 my-3 inline-block hover: cursor-default'

    //     // if block for card emoji
    //     if (this.props.object.weather[0].main === 'Thunderstorm')
    //         em = '🌩️'
    //     else if (this.props.object.weather[0].main === 'Drizzle')
    //         em = '💧'
    //     else if (this.props.object.weather[0].main === 'Rain')
    //         em = '🌧️'
    //     else if (this.props.object.weather[0].main === 'Snow')
    //         em = '🌨️'
    //     else if (this.props.object.weather[0].main === 'Mist' || this.props.object.weather[0].main === 'Smoke' || this.props.object.weather[0].main === 'Dust' || this.props.object.weather[0].main === 'Haze' || this.props.object.weather[0].main === 'Fog' || this.props.object.weather[0].main === 'Sand' || this.props.object.weather[0].main === 'Squall')
    //         em = '🌫️'
    //     else if (this.props.object.weather[0].main === 'Ash')
    //         em = '🌋'
    //     else if (this.props.object.weather[0].main === 'Tornado')
    //         em = '🌪️'
    //     else if (this.props.object.weather[0].main === 'Clear')
    //         em = '☀️'

    //     this.setState({emoji: em, cardStyle: col})        
    // }

    render(){
        return(
            <div className={this.getColor()}>
                <div className="flex justify-between">
                    <p className="m-1 text-xl hover:text-lg" onClick={() => this.props.makeCurrent(this.props.object)}>👁️</p>
                    <p className="m-1 text-right text-xl hover:text-lg" onClick={() => this.props.delCard(this.props.object)}>🗑️</p>
                </div>
                <div className="w-3/4 mx-auto text-center">
                    <p className="mb-3 font-bold text-xl">{this.props.object.name ? this.props.object.name + ', ' + this.props.object.sys.country : "Unnamed" }</p>
                    <p className="mb-3 font-bold text-xs">{this.props.object.coord.lat + ', ' + this.props.object.coord.lon}</p>
                    <p className="my-3 font-bold text-6xl">{Math.round((this.props.object.main.temp*100 - 27315)/100)}°</p>
                    <p className="my-3 font-bold text-lg">Feels like {Math.round((this.props.object.main.feels_like*100 - 27315)/100)}°</p>
                    <p className="my-3 font-bold text-lg">{this.props.object.weather[0].main}</p>
                    <p className="my-3 font-bold text-6xl">{this.getEmoji()}</p>
                </div>
                <div className="w-3/4 mx-auto flex justify-between">
                    <p className="ml-3 my-3 font-bold text-lg">Min</p>
                    <p className="mr-3 my-3 font-bold text-lg">{Math.round((this.props.object.main.temp_min*100 - 27315)/100)}°</p>
                </div>
                <div className="w-3/4 mx-auto flex justify-between">
                    <p className="ml-3 my-3 font-bold text-lg">Max</p>
                    <p className="mr-3 my-3 font-bold text-lg">{Math.round((this.props.object.main.temp_max*100 - 27315)/100)}°</p>
                </div>
            </div>
        )
    }
}