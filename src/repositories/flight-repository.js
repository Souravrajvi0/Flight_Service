const { where, Model } = require('sequelize');
const {flights,Airplane,Airport, sequelize} = require('../models');
const  CrudRepository = require('./crud-repository');
const { required } = require('nodemon/lib/config');
const {Sequelize} = require('sequelize')
class FlightRepository extends CrudRepository {
    constructor(){
       super(flights);
    }
    async getAllFlights(filter,sort){
        const response = await flights.findAll({
            where : filter,
            order : sort,
            include : [
            {
                model : Airplane,
                required : true,
                //as : "Airplane_Detail"
            },
            {
                model : Airport,
                required : true,
                as : "departure_airport",
                on : {
                   col1 : Sequelize.where(Sequelize.col('flights.departureAirportId'),"=",Sequelize.col('departure_airport.code'))
                }
            },
             {
                model : Airport,
                required : true,
                as : "arrival_airport",
                // on : {
                //    col1 : Sequelize.where(Sequelize.col('flights.arrivalAirportId'),"=",Sequelize.col('arrival_airport.code'))
                // }
            }
        ]});
        return response;
    }
}





module.exports = FlightRepository
