const express = require("express");

const router = express.Router();
const {AirportController} = require("../../controllers");
const { AirportMiddleware} = require("../../middlewares");
 
router.post("/", 
    AirportMiddleware.validateCreateRequest,
    AirportController.createAirport);

router.get("/",AirportController.getAirports);
router.get('/:id',AirportController.getAirport);
router.delete('/:id',AirportController.destroyAirport);
router.put('/:id',AirportController.updateAirport);
module.exports = router;
