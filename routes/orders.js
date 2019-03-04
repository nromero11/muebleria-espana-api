var express = require('express');
var router = express.Router();
const OrderModel = require('../db/models/OrderModel');
const ApiResponse = require('../lib/ApiResponse');

/* GET Order listing. */
router.get('/getall', async (req, res) => {
    try {
        let result = await OrderModel.getAll();
        ApiResponse.ok(res, result);
    } catch (ex) {
        ApiResponse.error(res, ex);
    }
});

/* GET Order by id. */
router.get('/get/:id', async (req, res) => {
    try {
        let result = await OrderModel.get(req.params.id);
        ApiResponse.ok(res, result);
    } catch (ex) {
        ApiResponse.error(res, ex);
    }
});

/*Save/Update Order */
router.post('/save', async (req, res) => {
    try {
        if (typeof req.body.id === 'undefined') {
            let result = await OrderModel.save(req.body);
            ApiResponse.ok(res, result);
        }else{
            let result = await OrderModel.update(req.body);
            ApiResponse.ok(res, result);
        }    
        
    } catch (ex) {
        ApiResponse.error(res, ex);
    }
});

module.exports = router;