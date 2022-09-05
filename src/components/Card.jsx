
export default function Card(props) {
    const getColor = () => {
        if (Math.round(( props.object.main.temp*100 - 27315)/100) > 0 && Math.round(( props.object.main.temp*100 - 27315)/100) < 10)
            return 'bg-blue-300 rounded-2xl w-52 mx-10 my-3 inline-block hover: cursor-default'
        else if (Math.round(( props.object.main.temp*100 - 27315)/100) >= 10 && Math.round(( props.object.main.temp*100 - 27315)/100) < 20)
            return'bg-amber-300 rounded-2xl w-52 mx-10 my-3 inline-block hover: cursor-default'
        else if (Math.round(( props.object.main.temp*100 - 27315)/100) >= 20 && Math.round(( props.object.main.temp*100 - 27315)/100) < 30)
            return 'bg-orange-500 rounded-2xl w-52 mx-10 my-3 inline-block hover: cursor-default'
        else if (Math.round(( props.object.main.temp*100 - 27315)/100) >= 30)
            return 'bg-red-500 rounded-2xl w-52 mx-10 my-3 inline-block hover: cursor-default'
        else
            return 'bg-slate-200 rounded-2xl w-52 mx-10 my-3 inline-block hover: cursor-default'
    }

    const getEmoji = () => {
        if ( props.object.weather[0].main === 'Thunderstorm')
            return '🌩️'
        else if ( props.object.weather[0].main === 'Drizzle')
            return '💧'
        else if ( props.object.weather[0].main === 'Rain')
            return '🌧️'
        else if ( props.object.weather[0].main === 'Snow')
            return '🌨️'
        else if ( props.object.weather[0].main === 'Mist' ||  props.object.weather[0].main === 'Smoke' ||  props.object.weather[0].main === 'Dust' ||  props.object.weather[0].main === 'Haze' ||  props.object.weather[0].main === 'Fog' ||  props.object.weather[0].main === 'Sand' ||  props.object.weather[0].main === 'Squall')
            return '🌫️'
        else if ( props.object.weather[0].main === 'Ash')
            return '🌋'
        else if ( props.object.weather[0].main === 'Tornado')
            return '🌪️'
        else if ( props.object.weather[0].main === 'Clear')
            return '☀️'
        else
            return '☁️'
    }

    return(
        <div className={ getColor()} draggable>
            <div className="flex justify-between">
                <p className="m-1 text-xl hover:text-lg" onClick={() =>  props.makeCurrent( props.object, false)}>👁️</p>
                <p className="m-1 text-right text-xl hover:text-lg" onClick={() =>  props.delCard( props.object)}>🗑️</p>
            </div>
            <div className="w-3/4 mx-auto text-center">
                <p className="mb-3 font-bold text-xl">{ props.object.name ?  props.object.name + ', ' +  props.object.sys.country : "Unnamed" }</p>
                <p className="mb-3 font-bold text-xs">{ props.object.coord.lat + ', ' +  props.object.coord.lon}</p>
                <p className="my-3 font-bold text-6xl">{Math.round(( props.object.main.temp*100 - 27315)/100)}°</p>
                <p className="my-3 font-bold text-lg">Feels like {Math.round(( props.object.main.feels_like*100 - 27315)/100)}°</p>
                <p className="my-3 font-bold text-lg">{ props.object.weather[0].main}</p>
                <p className="my-3 font-bold text-6xl">{ getEmoji()}</p>
            </div>
            <div className="w-3/4 mx-auto flex justify-between">
                <p className="ml-3 my-3 font-bold text-lg">Min</p>
                <p className="mr-3 my-3 font-bold text-lg">{Math.round(( props.object.main.temp_min*100 - 27315)/100)}°</p>
            </div>
            <div className="w-3/4 mx-auto flex justify-between">
                <p className="ml-3 my-3 font-bold text-lg">Max</p>
                <p className="mr-3 my-3 font-bold text-lg">{Math.round(( props.object.main.temp_max*100 - 27315)/100)}°</p>
            </div>
        </div>
    )        
}