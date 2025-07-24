const { StatusCodes } = require('http-status-codes');
const {CityRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();

async function createCity(data){
    try {
        const response = await cityRepository.create(data);
        return response
        
    } catch (error) {
        console.log(error);
     
        if(error.name == 'SequelizeValidationError'|| error.name == 'SequelizeUniqueConstraintError'){
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
module.exports = {
    createCity
}