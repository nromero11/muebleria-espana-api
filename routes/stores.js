var express = require('express');
var router = express.Router();
const StoreModel = require('../db/models/StoreModel');
const ApiResponse = require('../lib/ApiResponse');

/* GET Store listing. */
router.get('/getall', async (req, res) => {
    try {
        let result = await StoreModel.getAll();
        ApiResponse.ok(res, result);
    } catch (ex) {
        ApiResponse.error(res, ex);
    }
});

/* GET Store by id. */
router.get('/get/:id', async (req, res) => {
    try {
        let result = await StoreModel.get(req.params.id);
        ApiResponse.ok(res, result);
    } catch (ex) {
        ApiResponse.error(res, ex);
    }
});

module.exports = router;