import mongoose from 'mongoose'

let Schema = mongoose.Schema;
let incidentSchema = new Schema({
    status: {type: String, default: 'pending'},
    priority: String,
    category: String,
    photo: String,
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    technician: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    dependence: {type: mongoose.Schema.Types.ObjectId, ref: 'Dependence'},
    registeredBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt:{ type: Date, default: Date.now}
});

module.exports = mongoose.model('Incident',incidentSchema);
