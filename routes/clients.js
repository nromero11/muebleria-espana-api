var express = require('express');
var router = express.Router();
const ClientModel = require('../db/models/ClientModel');
const ApiResponse = require('../lib/ApiResponse');

/* GET Clients listing. */
router.post('/getall', async (req, res) => {
    try {
        let offset = '';
        let itemsPerPage = '';
        if(typeof req.body.options !== 'undefined'){
            let page = req.body.options.page || 1; 
            itemsPerPage = req.body.options.itemsPerPage || 10;
            offset = (parseInt(page) - 1) * itemsPerPage;     
        }

        let where = [' 1=1 '];
        if (typeof req.body.search !== 'undefined' && typeof req.body.search.firstname !== 'undefined' && req.body.search.firstname !== '') {
            where.push(` firstname like '%${req.body.search.firstname}%' `);
        }
        if (typeof req.body.search !== 'undefined' && typeof req.body.search.lastname !== 'undefined' && req.body.search.lastname !== '') {
            where.push(` lastname like '%${req.body.search.lastname}%' `);
        }
        if (typeof req.body.search !== 'undefined' && typeof req.body.search.cid !== 'undefined' && req.body.search.cid !== '') {
            where.push(` cid like '%${req.body.search.cid}%' `);
        }

        let orderBy = '';
        if(typeof req.body.options !== 'undefined' && req.body.options.sortBy.length > 0){
            orderBy = " order by " + req.body.options.sortBy[0];
            orderBy += (req.body.options.sortDesc.length > 0 && req.body.options.sortDesc[0]) ? ' desc' : ' asc';
        }

        let result = await ClientModel.getAll(where.join('and'), orderBy, itemsPerPage, offset);
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
        if (typeof req.body.lastname === 'undefined') {
            ApiResponse.missingParam(res, 'Last Name');
            return;
        }
        if (typeof req.body.address === 'undefined') {
            ApiResponse.missingParam(res, 'Address');
            return;
        }
        if (typeof req.body.cid === 'undefined') {
            ApiResponse.missingParam(res, 'DNI');
            return;
        }
        if (typeof req.body.id === 'undefined' || req.body.id == 0) {
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