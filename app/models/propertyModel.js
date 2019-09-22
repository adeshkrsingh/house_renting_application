var baseModel = require('./baseModel');
var propertySchema = require('../schemas/propertySchema');

class propertyModel extends baseModel {
    constructor() {
        super(propertySchema);
    }

    pushUserApplication(owner_property_id, block_id, newPropertyApplicantObj) {
        if (this.validateParameters()) {
            var self = this;
            newPropertyApplicantObj.done = true;
            /* Promise start */
            return new Promise((resolve, reject) => {
                this.schemaUsed.update({
                        _id: owner_property_id
                    }, {
                        $push: {
                            property_applicants: newPropertyApplicantObj
                        }
                    },
                    function (err, rowData) {
                        if (err) {
                            reject([]);
                        }
                        if (!rowData) {
                            reject([]);
                        }
                        resolve(rowData);
                    });
            });
            /* Promise ends */
        } else {
            return [];
        }
    }

    approveUserApplication(owner_property_id, user_id) {
        if (this.validateParameters()) {
            var self = this;
            /* Promise start */
            return new Promise((resolve, reject) => {
                this.schemaUsed.update({
                        _id: owner_property_id,
                        "property_applicants._id": user_id
                    }, {
                        "$set": {
                            "property_applicants.$.application_status": 'accepted'
                        }
                    },
                    function (err, rowData) {
                        if (err) {
                            reject([]);
                        }
                        if (!rowData) {
                            reject([]);
                        }
                        resolve(rowData);
                    });
            });
            /* Promise ends */
        } else {
            return [];
        }
    }


    makeBlockUnavaliable(owner_property_id, block_id) {
        if (this.validateParameters()) {
            var self = this;
            /* Promise start */
            return new Promise((resolve, reject) => {
                this.schemaUsed.update({
                        _id: owner_property_id,
                        "property_details._id": block_id
                    }, {
                        "$set": {
                            "property_details.$.is_avaliable": false
                        }
                    },
                    function (err, rowData) {
                        if (err) {
                            reject([]);
                        }
                        if (!rowData) {
                            reject([]);
                        }
                        resolve(rowData);
                    });
            });
            /* Promise ends */
        } else {
            return [];
        }
    }
}


module.exports = new propertyModel();