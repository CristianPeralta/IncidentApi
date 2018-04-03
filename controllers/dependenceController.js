import User from '../models/Dependence'
import mongoose from 'mongoose'


module.exports.create = (req, res) => {
  let data = req.body
  dependence = new Dependence(data)

  dependence.save(function (err, dependence) {
      if(err){
        console.log(err)
        return res.sendStatus(503)
      }
      return res.json(dependence)
  })
}

module.exports.read = (req, res) => {

  Dependence.find({}).exec((err, dependence) => {
    if(err){
      console.log(err)
      return res.sendStatus(503)
    }
    return res.json(dependence)
  })
}

module.exports.readBy = (req, res) => {
  let filters = req.body
  Dependence.find(filters).exec((err, dependence) => {
    if(err){
      console.log(err)
      return res.sendStatus(503)
    }
    return res.json(dependence)
  })
}

module.exports.getOne = (req, res) => {
  let id = req.params.id

  Dependence.findOne({_id: id}).exec((err, dependence) => {
    if(err){
      console.log(err)
      return res.sendStatus(503)
    }
    return res.json(dependence)
  })
}

module.exports.update = (req, res) => {
  let data = req.body
  let id = data._id
  delete data._id

  Dependence.findOneAndUpdate({_id: id}, data, (err, dependence) => {
    if(err){
      console.log(err)
      return res.sendStatus(503)
    }
    console.log(dependence)
    return res.json(dependence)
  })
}


module.exports.delete = (req, res) => {
  let id = req.params.id

  Dependence.findOneAndRemove({_id: id}, (err, dependence) => {
    if(err){
      console.log(err)
      return res.sendStatus(503)
    }
    console.log(dependence)
    return res.json(dependence)
  })
}
