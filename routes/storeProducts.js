var express = require('express');
var router = express.Router();
const StoreProductsModel = require('../db/models/StoreProductsModel');
const ApiResponse = require('../lib/ApiResponse');

/* GET Store Products listing. */
router.post('/getall', async (req, res) => {
    try {
        let page = req.body.options.page || 1; 
        let itemsPerPage = req.body.options.itemsPerPage || 10;
        const offset = (parseInt(page) - 1) * itemsPerPage;

        let where = [' 1 = 1 '];
        if (typeof req.body.search !== 'undefined' && typeof req.body.search.store_id !== 'undefined' && req.body.search.store_id !== '') {
            where.push(` st.store_id = ${req.body.search.store_id} `);
        }
        if (typeof req.body.search !== 'undefined' && typeof req.body.search.productName !== 'undefined' && req.body.search.productName !== '') {
            where.push(` p.name like '%${req.body.search.productName}%' `);
        }

        let orderBy = '';
        if(typeof req.body.options !== 'undefined' && req.body.options.sortBy.length > 0){
            orderBy = " order by " + req.body.options.sortBy[0];
            orderBy += (req.body.options.sortDesc.length > 0 && req.body.options.sortDesc[0]) ? ' desc' : ' asc';
        }

        let result = await StoreProductsModel.get(where.join('and'), orderBy, itemsPerPage, offset);
        ApiResponse.ok(res, result);
    } catch (ex) {
        ApiResponse.error(res, ex);
    }
});


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
        if (typeof req.body.id === 'undefined' || req.body.id == 0) {
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