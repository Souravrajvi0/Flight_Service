const {StatusCodes} = require('http-status-codes')
const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.name||!req.body.code||!req.body.cityId){
        ErrorResponse.message = 'Something went wrong while creating an airport';
        ErrorResponse.error = new AppError(["Correct Details for airport not provided"],StatusCodes.BAD_REQUEST)

        return res
                 .status(StatusCodes.BAD_REQUEST)
                 .json(ErrorResponse)
    }
    next();
}

module.exports = {
    validateCreateRequest
}
