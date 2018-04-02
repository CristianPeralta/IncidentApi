import mongoose from 'mongoose'

let Schema = mongoose.Schema;
let userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    lastname: String,
    dni: String,
    cellphone: String,
    status: {type: String, default: false},
    role: String,
    dependence: {type: mongoose.Schema.Types.ObjectId, ref: 'Dependence'},
    registeredBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt:{ type: Date, default: Date.now}
});

module.exports = mongoose.model('User',userSchema);
