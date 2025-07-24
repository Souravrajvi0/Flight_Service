const {StatusCodes} = require('http-status-codes');
const {SuccessResponse,ErrorResponse} = require('../utils/common');
const {CityService} = require('../services')
async function createCity(req,res) {
    try {
        const response = await CityService.createCity({
            name : req.body.name,
        });
        SuccessResponse.data = response;
        return res  
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
        
    }
}

module.exports = {
    createCity
}