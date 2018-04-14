import mongoose from 'mongoose'

let Schema = mongoose.Schema;
let dependenceSchema = new Schema({
    name: {type: String, unique: true, required: [true, 'Name is required']},
    acronym: {type: String, unique: true, required: [true, 'Acronym is required']},
    annex: String,
    latitude: String,
    longitude: String,
    photoUrl: String,
    createdAt:{ type: Date, default: Date.now}
});

let Dependence = mongoose.model('Dependence',dependenceSchema);
module.exports = Dependence;
