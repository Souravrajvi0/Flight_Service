const express = require("express");

const router = express.Router();
const {FlightController} = require("../../controllers");
const { FlightMiddleware} = require("../../middlewares");
 
router.post("/", 
    FlightMiddleware.validateCreateFlightRequest,
    FlightController.createFlight
    );

// router.get("/",AirplaneController.getAirplanes);
// router.get('/:id',AirplaneController.getAirplane);
// router.delete('/:id',AirplaneController.destroyAirplane);
// router.put('/:id',AirplaneController.updateAirplane);
module.exports = router;
