import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

import User from '../models/User'

module.exports.create = function (req, res) {
  let data = req.body
  user.name = data.name
  user.email = data.email
  user.lastname = data.lastname
  user.dni = data.dni
  user.cellphone = data.cellphone
  user.role = data.role
  user.dependence = mongoose.Types.ObjectId(data.dependence)
  user.registeredBy = mongoose.Types.ObjectId(data.registeredBy)
  user.password = bcrypt.hashSync(data.password, 10)

  user.save(function (err, user) {
      if(err){
        console.log(err)
        return res.sendStatus(503)
      }
      req.session.user = user
      let currentUser = req.session.user
      return res.json(currentUser)
  });
}

module.exports.getOne(req, res) => {
  let id = req.params.id

  User.findOne({_id: id}).exec((err, user) => {
    if(err){
      console.log(err)
      return res.sendStatus(503)
    }
    return res.json(user)
  })
}

module.exports.read(req, res) => {

  User.find({}).exec((err, users) => {
    if(err){
      console.log(err)
      return res.sendStatus(503)
    }
    return res.json(users)
  })
}

module.exports.update(req, res) => {
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

module.exports.delete(req, res) => {
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
      req.session.user = user
      let currentUser = req.session.user
      return res.json(currentUser)
    }

  })
}

module.exports.logout= function (req,res) {
    req.session.destroy(function(err) {
      // cannot access session here
      if(err){
        console.log(err);
        return res.sendStatus(503)
      }
      return res.sendStatus(200);
    })
}
