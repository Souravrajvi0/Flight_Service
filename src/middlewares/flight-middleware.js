const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateFlightRequest(req, res, next) {
    const {
        flightNumber,
        airplaneId,
        departureAirportId,
        arrivalAirportId,
        arrivalTime,
        departureTime,
        price,
        totalSeats
    } = req.body;

    if (
        !flightNumber ||
        !airplaneId ||
        !departureAirportId ||
        !arrivalAirportId ||
        !arrivalTime ||
        !departureTime ||
        !price ||
        !totalSeats
    ) {
        ErrorResponse.message = 'Something went wrong while creating the flight';
        ErrorResponse.error = new AppError(
            ['Missing required fields in the request body for flight creation'],
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    // Optional: You can also validate if arrivalTime > departureTime
    if (new Date(arrivalTime) <= new Date(departureTime)) {
        ErrorResponse.message = 'Invalid time data';
        ErrorResponse.error = new AppError(
            ['Arrival time must be after departure time'],
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}

module.exports = {
    validateCreateFlightRequest
};
