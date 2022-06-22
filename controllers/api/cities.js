const City = require('../../models/City')
const mongoose = require('mongoose')
const request = require('request')

module.exports = {
    citySearch,
    coordSearch,
    create,
    getAllCoords,
    del
}

async function citySearch(req, res){
    let data = await request(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.name}&appid=${process.env.API_KEY}`, function(error, response, body){
        // console.error('error: ', error)
        // console.log('statusCode: ', response && response.statusCode)
        // console.log('body: ', body)
        if (response.statusCode === 404){
            res.status(400).json('City not found')
        } else{
            res.status(200).json(body)
        }
    })
}

async function coordSearch(req, res){
    if (req.body.lat > 90 || req.body.lat < -90 || req.body.lon > 180 || req.body.lon < -180)
        res.status(400).json('City not found')
    else{
        let data = await request(`https://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.lon}&appid=${process.env.API_KEY}`, function(error, response, body){
            // console.error('error: ', error)
            // console.log('statusCode: ', response && response.statusCode)
            // console.log('body: ', body)
            if (response.statusCode === 404){
                res.status(400).json('City not found')
            } else{
                res.status(200).json(body)
            }
        })
    }
}

async function create(req, res){
    try {
        let newCity = await City.create({ lat: req.body.city.coord.lat, lon: req.body.city.coord.lon, user: req.user._id });
        res.status(200).json(newCity);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function getAllCoords(req, res){
    try {
        let cityCoords = await City.find({user: req.user._id})
        res.status(200).json(cityCoords);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function del(req, res){
    try {
        let deleteItem = await City.deleteOne({user: req.user._id, _id: mongoose.Types.ObjectId(req.body.city.mongoId)})
        res.status(200).json(deleteItem);
    } catch (err) {
        res.status(400).json(err);
    }
}

// let deleteItem = await City.deleteOne({user: req.user._id, id: (req.body.city.sys.id ? req.body.city.sys.id : req.body.city.id), lat: req.body.city.coord.lat, lon: req.body.city.coord.lon})