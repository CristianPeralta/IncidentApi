import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

import User from '../models/User'
import jwt from 'jsonwebtoken'

module.exports.create = (req, res) => {
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
  user.save((err, fUser) => {
      if (err) return res.sendStatus(503)
      return res.json(fUser)
  });
}

module.exports.getOne = (req, res) => {
  let id = req.params.id
  User.findOne({_id: id}).populate('dependence').exec((err, user) => {
    if (err) return res.sendStatus(503)
    if (!user) return res.sendStatus(404)
    return res.json(user)
  })
}

module.exports.read = (req, res) => {

  User.find({}).populate('dependence', 'acronym').exec((err, users) => {
    if (err) return res.sendStatus(503)
    if (!users) return res.sendStatus(404)
    return res.json(users)
  })
}

module.exports.readBy = (req, res) => {
  let filters = req.body
  User.find(filters).populate('dependence').exec((err, users) => {
    if (err) return res.sendStatus(503)
    if (!users) return res.sendStatus(404)
    return res.json(users)
  })
}

module.exports.getUser = (req, res) => {
  if (req.user) {
    let id = req.user
    User.findOne({_id:id}).populate('dependence').exec((err, user) => {
      if (err) return res.sendStatus(503)
      if (!user) return res.sendStatus(404)
      return res.json(user)
    })
  }
}

module.exports.update = (req, res) => {
  let data = req.body
  let id = data._id
  delete data._id
  User.findOneAndUpdate({_id: id}, data, {new: true}, (uErr, fUser) => {
    if (uErr) return res.sendStatus(503)
    if (!fUser) return res.sendStatus(404)
    User.findOne({_id: fUser._id}).populate('dependence').exec((err, user) => {
      if (err) return res.sendStatus(503)
      if (!user) return res.sendStatus(404)
      return res.json(user)
    })
  })
}

module.exports.delete = (req, res) => {
  let id = req.params.id

  User.findOneAndRemove({_id: id}, (err) => {
    if (err) return res.sendStatus(503)
    return res.json(200)
  })
}

module.exports.login = (req,res) => {
  let data = req.body
  User.findOne({email:data.email}).select('+password').populate('dependence').then((user, err) => {
    if (err) return res.sendStatus(503)
    if (!user) return res.sendStatus(404)
    if (bcrypt.compareSync(data.password, user.password)) {
      let payload = {
        id: user._id,
        role: user.role
      }
      let token = jwt.sign(payload, 'apisecretkeyincident', {
        expiresIn: '24h'
      })
      res.json(token)
    }
  })
}
