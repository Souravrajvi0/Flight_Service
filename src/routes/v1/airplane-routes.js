const express = require("express");

const router = express.Router();
const {AirplaneController} = require("../../controllers");
const { AirplaneMiddleware} = require("../../middlewares");
 
router.post("/", 
    AirplaneMiddleware.validateCreateRequest,
    AirplaneController.createAirplane);

module.exports = router;
