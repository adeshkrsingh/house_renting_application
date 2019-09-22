var express = require('express');
var router = express.Router();
var PropertyController = require('../app/controllers/propertyController');

/* GET users listing. */
router.get('/', function (req, res, next) {
    PropertyController.getPropertyData().then((data) => {
        console.log(data);
        res.render('property_view/list_all_property', {
            data: data
        });
    });
    //   res.send('respond with a resource');
});


/* GET users listing. */
router.get('/apply', function (req, res, next) {
    // console.log(req.query);
    let property_identity = req.query.property_identity;
    let block_identity = req.query.block_identity;
    res.render('property_view/application_for_property', {
        property_identity: property_identity,
        block_identity: block_identity,
    });
    // res.send('done');
});


/* POST users listing. */
router.post('/apply', function (req, res, next) {
    let your_name = req.body.your_name;
    let your_email = req.body.your_email;
    let property_identity = req.body.property_identity;
    let block_identity = req.body.block_identity;

    PropertyController.pushApplicationRequest(property_identity, block_identity, your_name, your_email).then((data) => {
        res.redirect('/thankyou');
    });
});


router.get('/thankyou', function (req, res, next) {
    res.render('property_view/thankyou');
});

module.exports = router;