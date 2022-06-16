const express = require('express')
const router = express.Router()
citiesCtrl = require('../../controllers/api/cities')

module.exports = router

router.use(require('../../config/auth'));
router.post('/city_search', citiesCtrl.citySearch)
router.post('/coord_search', citiesCtrl.coordSearch)
router.post('/create', citiesCtrl.create)
router.delete('/del', citiesCtrl.del)
router.get('/get', citiesCtrl.getAllCoords)