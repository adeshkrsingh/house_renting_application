//Require Mongoose
var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

const propSchema = new Schema({
    block_id:  { type: ObjectId },
    block_type: { type: String, default: 'room' }, /* room, bed */
    block_description: { type: String, default: null },
    block_price: { type: Number, default: 1000 }, /* say min price if not given */
    is_avaliable:  { type: Boolean, default: true }, /* make it avalibale */
    updated_at: { type: Date, default: Date.now }
});

const userSchema = new Schema({
    block_id: { type: ObjectId }, /* pointing to the block */
    user_name: { type: String, default: null },
    user_email: { type: String, default: null },
    application_status: { type: String, default: 'pending' },  /* accepted, rejected, pending */
    updated_at: { type: Date, default: Date.now }
});

var propertySchema = new Schema({
    property_name:  { type: String, default: null }, /* Building Name, identifier */
    property_details:  [propSchema], 
    property_applicants:  [userSchema],
    owner_name:  { type: String, default: null }, /* owner name */
    owner_email:  { type: String, default: null }, 
    deleted_at: { type: String, default: null },
    updated_at: { type: Date, default: Date.now }
});


// Compile model from schema
module.exports = mongoose.model('house', propertySchema);