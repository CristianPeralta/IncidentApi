import mongoose from 'mongoose'

let Schema = mongoose.Schema;
let userSchema = new Schema({
    email: String,
    password: {type: String, select: false, required: [true, 'Password is required']},
    name: {type: String, required: [true, 'Name is required']},
    lastname: String,
    dni: {type: String, unique: true, required: [true, 'Dni is required']},
    cellphone: String,
    status: {type: String, default: false},
    role: {type: String, default: 'client'},
    dependence: {type: mongoose.Schema.Types.ObjectId, ref: 'Dependence'},
    registeredBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt:{ type: Date, default: Date.now}
});

module.exports = mongoose.model('User',userSchema);
