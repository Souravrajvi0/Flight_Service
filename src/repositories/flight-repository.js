const {flights} = require('../models');
const  CrudRepository = require('./crud-repository');

class FlightRepository extends CrudRepository {
    constructor(){
       super(flights);
    }
}

module.exports = FlightRepository
