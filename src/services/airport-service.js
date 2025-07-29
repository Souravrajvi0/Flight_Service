const { AirportRepository} = require("../repositories");
const airportRepository =  new AirportRepository();
const {StatusCodes} = require('http-status-codes');
const  AppError = require('../utils/errors/app-error')

async function createAirport(data) {
    try{
        const airport = await airportRepository.create(data);
        return airport;

    }catch(error){
        console.log(error)
        if(error.name == 'SequelizeValidationError'){
            let explanation = []
            error.errors.forEach(ere => {
                explanation.push(ere.message);
            });
            console.log(explanation)
        throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new airport object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}

async function getAirports() {
    try{
        const airports = airportRepository.getAll();
        return airports;
    }catch(error){
        throw new AppError("Cannot fetch the data of all the Airports!",StatusCodes.INTERNAL_SERVER_ERROR);
    }    
}

async function getAirport(id) {
    try{
        console.log('inside get airport service')
        const airport = await airportRepository.get(id);
        return airport;
    }catch(error){
        if(error.statusCode ==  StatusCodes.NOT_FOUND){
        throw new AppError("The Airport you requested doesn't exist",StatusCodes.NOT_FOUND);
        }
       throw new AppError ("Cannot fetch the data of the airport",StatusCodes.BAD_REQUEST);
    }  
}

async function destroyAirport(id) {
    try{
        const response = await airportRepository.destroy(id);
        if(response == 0){
            throw new AppError("This Airport Doesn't exist",StatusCodes.NOT_FOUND)
        }
        return response
    }catch(error){
        console.log(error);
           if (error instanceof AppError) {
            throw error;
        }
         throw new AppError ("Cannot fetch the data of the airport",StatusCodes.BAD_REQUEST);
    }
    
}

async function updateAirport(id,data) {
    try {
        const response = await airportRepository.update(id,data);
        if(response == 0){
            throw new AppError ("This Airport Doesn't Exist", StatusCodes.NOT_FOUND)
        }
        return response
    } catch (error) {
        if(error instanceof AppError){
            throw error
        }
    throw new AppError ("Cannot fetch the data of the airport",StatusCodes.BAD_REQUEST);
    }
    
}


module.exports = {
createAirport,
getAirport,
getAirports,
destroyAirport,
updateAirport
}
