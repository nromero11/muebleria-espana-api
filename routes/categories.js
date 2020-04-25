var express = require('express');
var router = express.Router();
const CategoryModel = require('../db/models/CategoryModel');
const ApiResponse = require('../lib/ApiResponse');

/* GET Category listing. */
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
        if (typeof req.body.search !== 'undefined' && typeof req.body.search.name !== 'undefined' && req.body.search.name !== '') {
            where.push(` name like '%${req.body.search.name}%' `);
        }

        let orderBy = '';
        if(typeof req.body.options !== 'undefined' && req.body.options.sortBy.length > 0){
            orderBy = " order by " + req.body.options.sortBy[0];
            orderBy += (req.body.options.sortDesc.length > 0 && req.body.options.sortDesc[0]) ? ' desc' : ' asc';
        }

        let result = await CategoryModel.getAll(where.join('and'), orderBy, itemsPerPage, offset);
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
        if (typeof req.body.name === 'undefined' || req.body.name.trim() == '') {
            ApiResponse.missingParam(res, 'Name');
            return;
        }
        if (typeof req.body.id === 'undefined' || req.body.id == 0) {
            let result = await CategoryModel.save(req.body);
            ApiResponse.ok(res, result);
        } else {
            let result = await CategoryModel.update(req.body);
            ApiResponse.ok(res, result);
        }

    } catch (ex) {
        ApiResponse.error(res, ex);
    }
});

module.exports = router;