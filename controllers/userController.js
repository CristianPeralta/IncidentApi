import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

import User from '../models/User'

module.exports.create = function (req, res) {
  let data = req.body
  let user = new User()
  user.name = data.name
  user.email = data.email
  user.lastname = data.lastname
  user.dni = data.dni
  user.cellphone = data.cellphone
  data.role ? (user.role = data.role) : console.log('No role');
  user.dependence = mongoose.Types.ObjectId(data.dependence)
  data.registeredBy ? (user.registeredBy = mongoose.Types.ObjectId(data.registeredBy)) : console.log('No registeredBy');
  user.password = bcrypt.hashSync(data.password, 10)
  user.save(function (err, user) {
      if(err){
        console.log(err)
        return res.sendStatus(503)
      }
      console.log(user);
      return res.json(user)
  });
}

module.exports.getOne = (req, res) => {
  let id = req.params.id

  User.findOne({_id: id}).exec((err, user) => {
    if(err){
      console.log(err)
      return res.sendStatus(503)
    }
    return res.json(user)
  })
}

module.exports.read = (req, res) => {

  User.find({}).exec((err, users) => {
    if(err){
      console.log(err)
      return res.sendStatus(503)
    }
    return res.json(users)
  })
}

module.exports.readBy = (req, res) => {
  let filters = req.body
  User.find(filters).exec((err, users) => {
    if(err){
      console.log(err)
      return res.sendStatus(503)
    }
    return res.json(users)
  })
}

module.exports.update = (req, res) => {
  let data = req.body
  let id = data._id
  delete data._id

  User.findOneAndUpdate({_id: id}, data, (err, user) => {
    if(err){
      console.log(err)
      return res.sendStatus(503)
    }
    console.log(user)
    return res.json(user)
  })
}

module.exports.delete = (req, res) => {
  let id = req.params.id

  User.findOneAndRemove({_id: id}, (err, user) => {
    if(err){
      console.log(err)
      return res.sendStatus(503)
    }
    console.log(user)
    return res.json(user)
  })
}

module.exports.login = function (req,res) {
  let data = req.body
  console.log('api login');
  User.findOne({email:data.email}).then((user, err) => {
    if(err){
      console.log(err)
      return res.sendStatus(503)
    }
    if (bcrypt.compareSync(data.password, user.password)) {
      if(err){
        console.log(err)
        return res.sendStatus(503)
      }
      return res.json(user)
    }

  })
}
