import { Component } from 'react'

export default class Card extends Component {
    render(){
        return(
            <div className="rounded-2xl w-52 mx-10 my-3 bg-blue-400 inline-block hover: cursor-default">
                <div className="flex justify-between">
                    <p className="m-1 text-xl hover:text-2xl" onClick={() => this.props.makeCurrent(this.props.object)}>👁️</p>
                    <p className="m-1 text-right text-xl hover:text-2xl" onClick={() => this.props.delCard(this.props.object)}>🗑️</p>
                </div>
                <div className="w-3/4 mx-auto text-center">
                    <p className="mb-3 font-bold text-xl">{this.props.object.name + ', ' + this.props.object.sys.country}</p>
                    <p className="my-3 font-bold text-6xl">{Math.round((this.props.object.main.temp*100 - 27315)/100)}°</p>
                    <p className="my-3 font-bold text-lg">Feels like {Math.round((this.props.object.main.feels_like*100 - 27315)/100)}°</p>
                    <p className="my-3 font-bold text-lg">{this.props.object.weather[0].main}</p>
                    <p className="my-3 font-bold text-6xl">☁️</p>
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