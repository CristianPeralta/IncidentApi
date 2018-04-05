import mongoose from 'mongoose'

let Schema = mongoose.Schema;
let dependenceSchema = new Schema({
    name: String,
    acronym: String,
    annex: String,
    latitude: String,
    longitude: String,
    photoUrl: String,
    createdAt:{ type: Date, default: Date.now}
});

let Dependence = mongoose.model('Dependence',dependenceSchema);
module.exports = Dependence;
