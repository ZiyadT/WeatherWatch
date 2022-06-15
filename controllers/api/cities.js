const City = require('../../models/City')
const request = require('request')

module.exports = {
    citySearch,
    coordSearch
}

async function citySearch(req, res){
    let data = await request(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.name}&appid=${process.env.API_KEY}`, function(error, response, body){
        console.error('error: ', error)
        console.log('statusCode: ', response && response.statusCode)
        console.log('body: ', body)
        if (response.statusCode === 404){
            res.status(400).json('City not found')
        } else{
            res.status(200).json(body)
        }
    })
}

async function coordSearch(req, res){
    let data = await request(`https://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.lon}&appid=${process.env.API_KEY}`, function(error, response, body){
        console.error('error: ', error)
        console.log('statusCode: ', response && response.statusCode)
        console.log('body: ', body)
        if (response.statusCode === 404){
            res.status(400).json('City not found')
        } else{
            res.status(200).json(body)
        }
    })
}