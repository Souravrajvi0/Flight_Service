const express = require('express');
const router = express.Router();
const {CityController} = require('../../controllers');
const {CityMiddleware} = require('../../middlewares');

router.post("/",CityMiddleware.validateCreateRequest,
    CityController.createCity);

router.delete("/:id",CityController.deleteCity);
router.put("/:id",CityController.updateCity);    


module.exports = router;

