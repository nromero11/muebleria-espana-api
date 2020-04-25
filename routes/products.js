var express = require('express');
var router = express.Router();
const ProductModel = require('../db/models/ProductModel');
const ApiResponse = require('../lib/ApiResponse');

/* GET Products listing. */
router.post('/getall', async (req, res) => {
    try {
        let page = req.body.options.page || 1; 
        let itemsPerPage = req.body.options.itemsPerPage || 10;
        const offset = (parseInt(page) - 1) * itemsPerPage;

        let where = [' p.category_id = c.id '];
        if (typeof req.body.search.name !== 'undefined' && req.body.search.name !== '') {
            where.push(` p.name like '%${req.body.search.name}%' `);
        }
        if (typeof req.body.search.category !== 'undefined' && req.body.search.category !== '') {
            where.push(` p.category_id = ${req.body.search.category} `);
        }

        let orderBy = '';
        if(typeof req.body.options !== 'undefined' && req.body.options.sortBy.length > 0){
            orderBy = " order by " + req.body.options.sortBy[0];
            orderBy += (req.body.options.sortDesc.length > 0 && req.body.options.sortDesc[0]) ? ' desc' : ' asc';
        }

        let result = await ProductModel.getAll(where.join('and'), orderBy, itemsPerPage, offset);
        ApiResponse.ok(res, result);
    } catch (ex) {
        ApiResponse.error(res, ex);
    }
});

/* GET Products listing. */
router.get('/getallproducts', async (req, res) => {
    try {
        let result = await ProductModel.getallProducts();
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
        if (typeof req.body.name === 'undefined' || req.body.name.trim() === '') {
            ApiResponse.missingParam(res, 'Name');
            return;
        }
        if (typeof req.body.category_id === 'undefined' || req.body.category_id === 0) {
            ApiResponse.missingParam(res, 'Category');
            return;
        }

        if (typeof req.body.id === 'undefined' || req.body.id == 0) {
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