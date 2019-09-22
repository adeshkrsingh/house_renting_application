var express = require('express');
var router = express.Router();
var PropertyController = require('../app/controllers/propertyController');

/* GET users listing. */
router.get('/', function (req, res, next) {
    PropertyController.getPropertyData().then((data) => {
        console.log(data[0].id);
        res.render('owner_view/list_all_property', {
            data: data
        });
    });
    //   res.send('respond with a resource');
});


/* GET users listing. */
router.get('/add-property', function (req, res, next) {
    res.render('owner_view/add_property' );
});

/* POST users listing. */
router.post('/add-property', function (req, res, next) {
    let property_name = req.body.property_name;
    let owner_name = req.body.owner_name;
    let owner_email = req.body.owner_email;

    PropertyController.createNewProperty(property_name, owner_name, owner_email).then((data) => {
        console.log(data[0].id);
        res.render('owner_view/add_block' , {
            property_identity : data[0].id
        } );
        // res.send('done');
    });
});


router.post('/add-block', function (req, res, next) {
    let property_name = req.body.property_name;
    let block_type = req.body.block_type;
    let block_description = req.body.block_description;
    let block_price = req.body.block_price;

    PropertyController.pushNewBlocksInProperty(property_name, block_type, block_description, block_price).then((data) => {
        // res.render('owner_view/thankyou');
        res.send('done');
    });
});


/* GET users listing. */
router.get('/add-property', function (req, res, next) {
    // console.log(req.query);
    let property_identity = req.query.property_identity;
    let block_identity = req.query.block_identity;
    res.render('owner_view/application_for_property', {
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


router.get('/dummy', function (req, res, next) {
    PropertyController.createFakeEntries().then((data) => {
        console.log(data);
        res.send(data);
    });
    //   res.send('respond with a resource');
});

router.get('/push', function (req, res, next) {

    PropertyController.pushApplicationRequest().then((data) => {
        console.log(data);
        res.send(data);
    });
    //   res.send('respond with a resource');
});

router.get('/approve', function (req, res, next) {

    PropertyController.approveUserApplicationRequest().then((data) => {
        console.log(data);
        res.send(data);
    });
    //   res.send('respond with a resource');
});


router.get('/thankyou', function (req, res, next) {
    res.render('owner_view/thankyou');
});

module.exports = router;