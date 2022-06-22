export default function Overlay(props){
    function getColor(){
        if (Math.round((props.currentCity.main.temp*100 - 27315)/100) > 0 && Math.round((props.currentCity.main.temp*100 - 27315)/100) < 10)
            return 'bg-blue-300'
        else if (Math.round((props.currentCity.main.temp*100 - 27315)/100) >= 10 && Math.round((props.currentCity.main.temp*100 - 27315)/100) < 20)
            return'bg-amber-300'
        else if (Math.round((props.currentCity.main.temp*100 - 27315)/100) >= 20 && Math.round((props.currentCity.main.temp*100 - 27315)/100) < 30)
            return 'bg-orange-500'
        else if (Math.round((props.currentCity.main.temp*100 - 27315)/100) >= 30)
            return 'bg-red-500'
        else
            return 'bg-slate-200'
    }
    return(
        <div id="overlay">
            <div id="inner-overlay" className={getColor()}>
                <div className="flex justify-between">
                    <p className="mt-10 mx-10 text-4xl font-bold">{props.currentCity ? (props.currentCity.name ? props.currentCity.name + ', ' + props.currentCity.sys.country : "Unnamed") : ''}</p>
                    <p className="mt-10 mx-10 text-4xl font-bold">{Math.round((props.currentCity.main.temp*100 - 27315)/100)}°C</p>
                </div>
                <div className="flex justify-between">
                    <p className="mx-10 mt-5 text-xl font-bold">{props.currentCity.weather[0].description}</p>
                    <p className="mx-10 mt-5 text-xl font-bold">Feels like {Math.round((props.currentCity.main.feels_like*100 - 27315)/100)}°C</p>
                </div>
                <div className="w-4/5 h-1/2 mx-auto my-12">
                    <div className="flex justify-between">
                        <p className="mx-10 mt-4 text-xl font-bold">Max</p>
                        <p className="mx-10 mt-4 text-xl font-bold">{Math.round((props.currentCity.main.temp_max*100 - 27315)/100)}°C</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="mx-10 mt-4 text-xl font-bold">Min</p>
                        <p className="mx-10 mt-4 text-xl font-bold">{Math.round((props.currentCity.main.temp_min*100 - 27315)/100)}°C</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="mx-10 mt-4 text-xl font-bold">Wind</p>
                        <p className="mx-10 mt-4 text-xl font-bold">{props.currentCity.wind.speed} m/s</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="mx-10 mt-4 text-xl font-bold">Humidity</p>
                        <p className="mx-10 mt-4 text-xl font-bold">{props.currentCity.main.humidity}%</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="mx-10 mt-4 text-xl font-bold">Pressure</p>
                        <p className="mx-10 mt-4 text-xl font-bold">{props.currentCity.main.pressure} hPa</p>
                    </div>
                    <button className={props.newCity ? "my-10 border border-black rounded p-1 bg-cyan-600 font-semibold mx-3" : "hidden"} onClick={props.addCard}>Add to Dashboard</button>
                    <button className="my-10 border border-black rounded p-1 bg-red-600 font-semibold mx-3" onClick={props.nullCity}>Close</button>
                </div>
            </div>
        </div>
    )
}