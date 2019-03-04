var express = require('express');
var router = express.Router();
const CategoryModel = require('../db/models/CategoryModel');
const ApiResponse = require('../lib/ApiResponse');

/* GET Category listing. */
router.get('/getall', async (req, res) => {
    try {
        let result = await CategoryModel.getAll();
        ApiResponse.ok(res, result);
    } catch (ex) {
        ApiResponse.error(res, ex);
    }
});

/* GET Category by id. */
router.get('/get/:id', async (req, res) => {
    try {
        let result = await CategoryModel.get(req.params.id);
        ApiResponse.ok(res, result);
    } catch (ex) {
        ApiResponse.error(res, ex);
    }
});

/*Save/Update Category */
router.post('/save', async (req, res) => {
    try {
        if (typeof req.body.name === 'undefined') {
            ApiResponse.missingParam(res, 'Name');
            return;
        }
        if (typeof req.body.id === 'undefined') {
            let result = await CategoryModel.save(req.body);
            ApiResponse.ok(res, result);
        }else{
            let result = await CategoryModel.update(req.body);
            ApiResponse.ok(res, result);
        }    
        
    } catch (ex) {
        ApiResponse.error(res, ex);
    }
});

module.exports = router;