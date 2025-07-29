const {FlightRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error");
const {StatusCodes} = require("http-status-codes");
const {compareTime} = require('../utils/helpers/datetime-helper')

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try{
        if(compareTime(data.arrivalTime,data.departureTime)){
            throw new AppError("Arival time should be greater departure time",StatusCodes.BAD_REQUEST);
        }
        const flight = await flightRepository.create(data);
        return flight;

    }catch(error){
        if(error.message == "Arival time should be greater departure time" ){
            throw error;
        }
        if(error.name == 'SequelizeValidationError'){
            let explanation = []
            error.errors.forEach(ere => {
                explanation.push(ere.message);
            });
            console.log(explanation)
        throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new flight object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}


module.exports = {
    createFlight
}