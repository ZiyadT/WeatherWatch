const express = require('express')
const router = express.Router()
citiesCtrl = require('../../controllers/api/cities')

module.exports = router

router.post('/city_search', citiesCtrl.citySearch)
router.post('/coord_search', citiesCtrl.coordSearch)