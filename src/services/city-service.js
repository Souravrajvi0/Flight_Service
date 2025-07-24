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
        throw new AppError("Cannot create a new city object",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteCity(id){
    try {
      const response = await cityRepository.destroy(id);
        if(response == 0){
            throw new AppError ("The City id Doesn't exist",StatusCodes.NOT_FOUND)
        }
      return response;
    } catch (error) {
         if(error instanceof AppError){
            throw error;
        }
        throw new AppError ("Cannot delete the city",StatusCodes.INTERNAL_SERVER_ERROR);
    } 
}

async function updateCity(id,data){
    try {
        const response = await cityRepository.update(id,data);
        if(response == 0){
            throw new AppError ("The City id Doesn't exist",StatusCodes.NOT_FOUND);
        }
        return response;
        
    } catch (error) {
        if(error instanceof AppError){
            throw error;
        }
       
        throw new AppError ("Cannot update the city",StatusCodes.INTERNAL_SERVER_ERROR);
    }

}
module.exports = {
    createCity,
    deleteCity,
    updateCity
}