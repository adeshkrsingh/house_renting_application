var propertyModel = require('../models/propertyModel');


class PropertyController {
    getPropertyData() {
        /*
            Purpose - to get All the questions from the Property collection
        */
        return new Promise((resolve, reject) => {
            propertyModel.findAll({}).then((rowData) => {
                if (!rowData) {
                    console.log(`no data avaliable in `);
                    reject([]);
                }
                resolve(rowData);
            });
        });
    }
    createNewProperty(property_name, owner_name, owner_email) {

        var queryObj = [{
            property_name: 'Property 1 ',
            owner_name: 'Adesh Singh',
            owner_email: 'adesh@example.com',
        }];

        return new Promise((resolve, reject) => {
            propertyModel.create(queryObj).then((rowData) => {
                if (!rowData) {
                    console.log(`no data avaliable in `);
                    reject([]);
                }
                resolve(rowData);
            });
        });
    }
    createFakeEntries() {
        /*
            Create dummy entries
        */
        var queryObj = [{
                property_name: 'Property 1 ',
                property_details: [{
                        block_type: "room",
                        block_description: "Room 1 on First Floor",
                        block_price: 5000,
                        is_avaliable: true,
                    },
                    {
                        block_type: "room",
                        block_description: "Room 2 on First Floor",
                        block_price: 5000,
                        is_avaliable: true,
                    },
                    {
                        block_type: "bed",
                        block_description: "Bed 1 of 2 in Room 3 on First Floor",
                        block_price: 3000,
                        is_avaliable: true,
                    },
                    {
                        block_type: "bed",
                        block_description: "Bed 2 of 2 in Room 3 on First Floor",
                        block_price: 3000,
                        is_avaliable: true,
                    },
                ],
                owner_name: 'Adesh Singh',
                owner_email: 'adesh@example.com',
            },
            {
                property_name: 'Property 2 ',
                property_details: [{
                        block_type: "room",
                        block_description: "Room 1 on Fourth Floor",
                        block_price: 5000,
                        is_avaliable: true,
                    },
                    {
                        block_type: "bed",
                        block_description: "Bed 2 of 2 in Room 3 on Fourth Floor",
                        block_price: 3000,
                        is_avaliable: true,
                    },
                ],
                owner_name: 'Nidhi Rai',
                owner_email: 'nidhi@example.com',
            }
        ];

        return new Promise((resolve, reject) => {
            propertyModel.create(queryObj).then((rowData) => {
                if (!rowData) {
                    console.log(`no data avaliable in `);
                    reject([]);
                }
                resolve(rowData);
            });
        });
    }

    pushNewBlocksInProperty(property_id, block_type, block_description, block_price) {
        // var property_id = "5d87c26c462bda1cfeb152d7";
        // var block_id = "5d87c26c462bda1cfeb152d9";
        var newBlockObj = {
            block_type: block_type,
            block_description: block_description,
            block_price: block_price,
        };
        return new Promise((resolve, reject) => {
            propertyModel.pushNewBlockInProperty(property_id, newBlockObj).then((rowData) => {
                if (!rowData) {
                    console.log(`no data avaliable in `);
                    reject([]);
                }
                resolve(rowData);
            });
        });
    }


    pushApplicationRequest(property_id, block_id, user_name, user_email) {
        // var property_id = "5d87c26c462bda1cfeb152d7";
        // var block_id = "5d87c26c462bda1cfeb152d9";
        var newPropertyApplicantObj = {
            block_id: block_id,
            user_name: 'user 1',
            user_email: 'user1@example.com' ,
        };
        return new Promise((resolve, reject) => {
            propertyModel.pushUserApplication(property_id, block_id, newPropertyApplicantObj).then((rowData) => {
                if (!rowData) {
                    console.log(`no data avaliable in `);
                    reject([]);
                }
                resolve(rowData);
            });
        });
    }
    approveUserApplicationRequest() {
        var property_id = "5d87c26c462bda1cfeb152d7";
        var block_id = "5d87c26c462bda1cfeb152d9";
        var user_id = "5d87c735c0e3c923d1826812";

        return new Promise((resolve, reject) => {
            propertyModel.approveUserApplication(property_id, user_id).then((rowData) => {
                if (!rowData) {
                    console.log(`no data avaliable in `);
                    reject([]);
                }
                propertyModel.makeBlockUnavaliable(property_id, block_id).then((rowData2) => {
                    if (!rowData2) {
                        console.log(`no data avaliable in `);
                        reject([]);
                    }
                    resolve(rowData2);
                });
            });
        }).catch((err) => {
            console.log('something wrong happen');
            return 'something wrong happen';
        });
    }
}

module.exports = new PropertyController();