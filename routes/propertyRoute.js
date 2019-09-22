var express = require('express');
var router = express.Router();
var PropertyController = require('../app/controllers/propertyController');

/* GET users listing. */
router.get('/', function(req, res, next) {
    PropertyController.getPropertyData().then((data) => {
        console.log(data);
        res.send(data);
    });
//   res.send('respond with a resource');
});


router.get('/dummy', function(req, res, next) {
    PropertyController.createFakeEntries().then((data) => {
        console.log(data);
        res.send(data);
    });
//   res.send('respond with a resource');
});

router.get('/push', function(req, res, next) {
    
    PropertyController.pushApplicationRequest().then((data) => {
        console.log(data);
        res.send(data);
    });
//   res.send('respond with a resource');
});

router.get('/approve', function(req, res, next) {
    
    PropertyController.approveUserApplicationRequest().then((data) => {
        console.log(data);
        res.send(data);
    });
//   res.send('respond with a resource');
});

module.exports = router;
