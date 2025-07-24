const {AirplaneRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error");
const {StatusCodes} = require("http-status-codes");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try{
        const airplane = await airplaneRepository.create(data);
        return airplane;

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
        throw new AppError("Cannot create a new airplane object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}


async function getAirplanes() {
    try{
        const airplanes = airplaneRepository.getAll();
        return airplanes;
    }catch(error){
        throw new AppError("Cannot fetch the data of all the airplanes!",StatusCodes.INTERNAL_SERVER_ERROR);
    }    
}



module.exports = {
    createAirplane ,
    getAirplanes
}
