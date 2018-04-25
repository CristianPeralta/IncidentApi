import Dependence from '../models/Incident'
import mongoose from 'mongoose'


module.exports.create = (req, res) => {
  let data = req.body
  let newIncident = new Incident()

  newIncident.name = data.name
  newIncident.status = data.status
  newIncident.client = mongoose.Types.ObjectId(data.client)
  newIncident.registeredBy = mongoose.Types.ObjectId(data.registeredBy)

  if (req.file) newIncident.photo = req.file.path

  newIncident.save((err, incident) => {
      if (err) return res.sendStatus(503)
      if (!incident) return res.sendStatus(404)
      return res.json(incident)
  });
}

module.exports.read = (req, res) => {
  Incident.find({}).exec((err, incident) => {
    if (err) return res.sendStatus(503)
    if (!incident) return res.sendStatus(404)
    return res.json(incident)
  })
}

module.exports.readBy = (req, res) => {
  let filters = req.body
  Incident.find(filters).exec((err, incident) => {
    if (err) return res.sendStatus(503)
    if (!incident) return res.sendStatus(404)
    return res.json(incident)
  })
}

module.exports.getOne = (req, res) => {
  let id = req.params.id

  Incident.findOne({_id: id}).exec((err, incident) => {
    if (err) return res.sendStatus(503)
    if (!incident) return res.sendStatus(404)
    return res.json(incident)
  })
}

module.exports.update = (req, res) => {
  let data = req.body
  let id = data._id
  delete data._id

  Incident.findOneAndUpdate({_id: id}, data, {new: true}, (err, incident) => {
    if (err) return res.sendStatus(503)
    if (!incident) return res.sendStatus(404)
    return res.json(incident)
  })
}

module.exports.delete = (req, res) => {
  let id = req.params.id

  Incident.findOneAndRemove({_id: id}, (err) => {
    if (err) return res.sendStatus(503)
    return res.json(200)
  })
}
