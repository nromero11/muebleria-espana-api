var express = require('express');
var router = express.Router();
const ProductModel = require('../db/models/ProductModel');
const ApiResponse = require('../lib/ApiResponse');

/* GET Products listing. */
router.get('/getall', async (req, res) => {
    try {
        let result = await ProductModel.getAll();
        ApiResponse.ok(res, result);
    } catch (ex) {
        ApiResponse.error(res, ex);
    }
});

/* GET Product by id. */
router.get('/get/:id', async (req, res) => {
    try {
        let result = await ProductModel.get(req.params.id);
        ApiResponse.ok(res, result);
    } catch (ex) {
        ApiResponse.error(res, ex);
    }
});

/*Save/Update Product */
router.post('/save', async (req, res) => {
    try {
        if (typeof req.body.name === 'undefined') {
            ApiResponse.missingParam(res, 'Name');
            return;
        }
        if (typeof req.body.category === 'undefined') {
            ApiResponse.missingParam(res, 'Category');
            return;
        }

        if (typeof req.body.id === 'undefined') {
            let result = await ProductModel.save(req.body);
            ApiResponse.ok(res, result);
        }else{
            let result = await ProductModel.update(req.body);
            ApiResponse.ok(res, result);
        }    
        
    } catch (ex) {
        ApiResponse.error(res, ex);
    }
});

module.exports = router;