import React, {Component} from 'react'
import Card from '../components/Card'

export default class Dashboard extends Component {

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
                    <div className="w-1/2">
                        <label className="text-lg font-semibold text-slate-300">CITY</label>
                        <input type="text" className="ml-3 mr-12 my-12 bg-cyan-300 w-1/2 h-8 px-2"></input>
                        <button className="text-lg font-bold text-orange-300 hover:text-rose-500" type="submit">SEARCH</button>
                    </div>
                    <div className="w-1/2">
                        <label className="text-lg font-semibold text-slate-300">LAT</label>
                        <input type="text" className="mx-3 my-12 bg-cyan-300 w-24 h-8 px-2"></input>
                        <label className="text-lg font-semibold text-slate-300">LON</label>
                        <input type="text" className="ml-3 mr-12 my-12 bg-cyan-300 w-24 h-8 px-2"></input>
                        <button className="text-lg font-bold text-orange-300 hover:text-rose-500" type="submit">SEARCH</button>
                    </div>
                </div>
                <div className='inline-block w-4/5 mx-auto my-8 text-left'>
                    <Card />
                    <Card />
                    <Card />
                </div>
            </main>
        )
    }
}