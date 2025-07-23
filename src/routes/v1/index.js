const express = require('express');

const { InfoController } = require('../../controllers');

const router = express.Router();

router.get('/info', InfoController.info);
const airplaneRoutes = require("./airplane-routes")

router.use("/airplanes",airplaneRoutes);

module.exports = router;