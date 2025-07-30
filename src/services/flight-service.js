const {FlightRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error");
const {StatusCodes} = require("http-status-codes");
const {compareTime} = require('../utils/helpers/datetime-helper');
const {Op} = require('sequelize');

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

async function getAllFlights(query) {
    // trip MUM - DEL
    let customFilter = {};
    let sortFilter = [];
    if(query.trips){
        [departureAirportId,arrivalAirportId] = query.trips.split('-');
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
        // if there are same then we'll just return an empty object or an error
    }

   if(query.price){
    [minPrice,maxPrice] = query.price.split('-');
    customFilter.price = {
        [Op.between] : [minPrice,(maxPrice == undefined ? 20000:maxPrice)]
    }
   }

   if(query.travellers){
    customFilter.totalSeats = {
        [Op.gte] : query.travellers
    }
   }

   if(query.tripDate){
    customFilter.departureTime = {
        [Op.between] : [query.tripDate,query.tripDate+'23:59:00']
    }
   }

   if(query.sort){
    const params = query.sort.split(',')
    const sortFilters = params.map((param)=>param.split('_'));
    sortFilter = sortFilters
   }


    try {
     const flights = await flightRepository.getAllFlights(customFilter,sortFilter);
     return flights;
    } catch (error) {
    throw new AppError ("Cannot get the flights data",StatusCodes.BAD_REQUEST);
    }
}


module.exports = {
    createFlight,
    getAllFlights
}