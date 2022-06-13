import { Component } from 'react'

export default class Card extends Component {
    render(){
        return(
            <div className="rounded-2xl w-52 mx-10 my-3 bg-blue-400 inline-block">
                <p className="m-1 text-right">❌</p>
                <div className="w-3/4 mx-auto text-center">
                    <p className="mb-3 font-bold text-xl">Toronto</p>
                    <p className="my-3 font-bold text-6xl">0°</p>
                    <p className="my-3 font-bold text-lg">Feels like -4°</p>
                    <p className="my-3 font-bold text-lg">Cloudy</p>
                    <p className="my-3 font-bold text-6xl">☁️</p>
                </div>
                <div className="w-3/4 mx-auto flex justify-between">
                    <p className="ml-3 my-3 font-bold text-lg">Min</p>
                    <p className="mr-3 my-3 font-bold text-lg">-4°</p>
                </div>
                <div className="w-3/4 mx-auto flex justify-between">
                    <p className="ml-3 my-3 font-bold text-lg">Max</p>
                    <p className="mr-3 my-3 font-bold text-lg">1°</p>
                </div>
            </div>
        )
    }
}