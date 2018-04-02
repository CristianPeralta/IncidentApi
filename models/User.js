import mongoose from 'mongoose'

var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    lastname: String,
    dni: String,
    cellphone: String,
    status: String,
    role: String,
    dependence: {type: mongoose.Schema.Types.ObjectId, ref: 'Dependence'},
    registeredBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt:{ type: Date, default: Date.now}
});

module.exports = mongoose.model('User',userSchema);
