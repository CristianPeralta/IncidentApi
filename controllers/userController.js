import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

import User from '../models/User'

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
  user.save((err, user) => {
      if (err) return res.sendStatus(503)
      return res.json(user)
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

module.exports.update = (req, res) => {
  let data = req.body
  let id = data._id
  console.log('asdasd')
  console.log(data)
  delete data._id
  User.findOneAndUpdate({_id: id}, data, {new: true}, (err, user) => {
    if (err) return res.sendStatus(503)
    if (!user) return res.sendStatus(404)
    User.findOne({_id: user._id}).populate('dependence').exec((err, user) => {
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
      if (err) return res.sendStatus(503)
      return res.json(user)
    }
  })
}
