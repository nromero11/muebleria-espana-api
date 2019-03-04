var express = require('express');
var router = express.Router();
const ClientModel = require('../db/models/ClientModel');
const ApiResponse = require('../lib/ApiResponse');

/* GET Clients listing. */
router.get('/getall', async (req, res) => {
    try {
        let result = await ClientModel.getAll();
        ApiResponse.ok(res, result);
    } catch (ex) {
        ApiResponse.error(res, ex);
    }
});

/* GET cliente by id. */
router.get('/get/:id', async (req, res) => {
    try {
        let result = await ClientModel.get(req.params.id);
        ApiResponse.ok(res, result);
    } catch (ex) {
        ApiResponse.error(res, ex);
    }
});

/*Save/Update cliente */
router.post('/save', async (req, res) => {
    try {
        if (typeof req.body.name === 'undefined') {
            ApiResponse.missingParam(res, 'Name');
            return;
        }
        if (typeof req.body.last_name === 'undefined') {
            ApiResponse.missingParam(res, 'Last Name');
            return;
        }
        if (typeof req.body.address === 'undefined') {
            ApiResponse.missingParam(res, 'Address');
            return;
        }
        if (typeof req.body.dni === 'undefined') {
            ApiResponse.missingParam(res, 'DNI');
            return;
        }
        if (typeof req.body.id === 'undefined') {
            let result = await ClientModel.save(req.body);
            ApiResponse.ok(res, result);
        }else{
            let result = await ClientModel.update(req.body);
            ApiResponse.ok(res, result);
        }    
        
    } catch (ex) {
        ApiResponse.error(res, ex);
    }
});

module.exports = router;