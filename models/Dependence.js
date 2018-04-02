import mongoose from 'mongoose'

var Schema = mongoose.Schema;
var dependenceSchema = new Schema({
    name: String,
    acronym: String,
    annex: String,
    latitude: String,
    longitude: String,
    photoUrl: String,
    createdAt:{ type: Date, default: Date.now}
});

module.exports = mongoose.model('Dependence',dependenceSchema);
