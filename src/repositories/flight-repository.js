const { where } = require('sequelize');
const {flights} = require('../models');
const  CrudRepository = require('./crud-repository');

class FlightRepository extends CrudRepository {
    constructor(){
       super(flights);
    }
    async getAllFlights(filter,sort){
        const response = await flights.findAll({
            where : filter,
            order : sort
        });
        return response;
    }
}





module.exports = FlightRepository
