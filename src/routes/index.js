const express = require('express');

const v1Routes = require('./v1');

const router = express.Router();
const airplaneRoutes = require("./v1/airplane-routes")


router.use('/v1', v1Routes);

module.exports = router;