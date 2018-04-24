import mongoose from 'mongoose'

let Schema = mongoose.Schema;
let incidentSchema = new Schema({
    name: {type: String, required: [true, 'Name is required']},
    status: {type: String, default: false},
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    registeredBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photo: String,
    createdAt:{ type: Date, default: Date.now}
});

module.exports = mongoose.model('Incident',incidentSchema);
