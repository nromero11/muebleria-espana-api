var express = require('express');
var router = express.Router();
const StoreProductsModel = require('../db/models/StoreProductsModel');
const ApiResponse = require('../lib/ApiResponse');


/* GET StoreProducts by id. */
router.get('/get/:store_id/:product_id', async (req, res) => {
    try {
        let result = await StoreProductsModel.get(req.params.store_id, req.params.product_id);
        ApiResponse.ok(res, result);
    } catch (ex) {
        ApiResponse.error(res, ex);
    }
});

/*Save/Update StoreProducts */
router.post('/save', async (req, res) => {
    try {
        if (typeof req.body.store_id === 'undefined') {
            ApiResponse.missingParam(res, 'Store Id');
            return;
        }
        if (typeof req.body.product_id === 'undefined') {
            ApiResponse.missingParam(res, 'Product Id');
            return;
        }
        if (typeof req.body.id === 'undefined') {
            let result = await StoreProductsModel.save(req.body);
            ApiResponse.ok(res, result);
        }else{
            let result = await StoreProductsModel.update(req.body);
            ApiResponse.ok(res, result);
        }    
        
    } catch (ex) {
        ApiResponse.error(res, ex);
    }
});

module.exports = router;