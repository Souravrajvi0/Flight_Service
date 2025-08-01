const {AirplaneService} = require("../services")
const {StatusCodes} = require('http-status-codes')
const { error } = require("winston")
const{SuccessResponse,ErrorResponse}= require('../utils/common')
async function createAirplane(req,res) {
    try {
        const airplane = await AirplaneService.createAirplane({
        modelNumber : req.body.modelNumber,
        capacity : req.body.capacity
        })
        SuccessResponse.data = airplane;
     return res
              .status(StatusCodes.CREATED)
              .json(SuccessResponse)
        
    } catch (error) {
        ErrorResponse.error = error;
        console.log("Caught error:", error);

        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }
    
}


async function getAirplanes(req,res) {
    try{
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.data = airplanes;
       
         return res
              .status(StatusCodes.OK)
              .json(SuccessResponse)
    }catch(error){
         ErrorResponse.error = error
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)

    }
}

async function getAirplane(req,res) {
    try{
        const airplane = await AirplaneService.getAirplane(req.params.id);
        console.log(airplane);
        SuccessResponse.data = airplane;
        return res
                .status(StatusCodes.ACCEPTED)
                .json(SuccessResponse)

    }catch(error){
        ErrorResponse.error = error
        return res
                 .status(error.statusCode)
                 .json(ErrorResponse)
    }
    
}

async function destroyAirplane(req,res) {
    try{
        const airplane = await AirplaneService.destroyAirplane(req.params.id);
        SuccessResponse.data = airplane;
        return res
                .status(StatusCodes.ACCEPTED)
                .json(SuccessResponse)

    }catch(error){
        ErrorResponse.error = error;

        return res
                 .status(error.statusCode)
                 .json(ErrorResponse)
    }
}


async function updateAirplane(req,res){
    try {
        const id = req.params.id;
        const data = req.body;
        const response =  await AirplaneService.updateAirplane(id,data);
        SuccessResponse.data = response
        return res
                 .status(StatusCodes.ACCEPTED)
                 .json(SuccessResponse)

        
    } catch (error) {
         ErrorResponse.error = error
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
        
    }
    
}



module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}