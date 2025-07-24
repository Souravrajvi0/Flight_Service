const {StatusCodes} = require('http-status-codes')
const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message = 'Something went wrong while creating a city';
        ErrorResponse.error = new AppError("No name is being sent to create the city",StatusCodes.BAD_REQUEST)
        return res
                 .status(StatusCodes.BAD_REQUEST)
                 .json(ErrorResponse)
    }
    next();
}

module.exports = {
    validateCreateRequest
}