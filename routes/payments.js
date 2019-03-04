var express = require('express');
var router = express.Router();
const PaymentsModel = require('../db/models/PaymentsModel');
const ApiResponse = require('../lib/ApiResponse');


/* GET Payments by id. */
router.get('/get/:id', async (req, res) => {
    try {
        let result = await PaymentsModel.get(req.params.id);
        ApiResponse.ok(res, result);
    } catch (ex) {
        ApiResponse.error(res, ex);
    }
});

/*Save/Update Payments */
router.post('/save', async (req, res) => {
    try {
        let result = await PaymentsModel.save(req.body);
        ApiResponse.ok(res, result); 
    } catch (ex) {
        ApiResponse.error(res, ex);
    }
});

module.exports = router;