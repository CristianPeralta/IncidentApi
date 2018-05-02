import Dependence from '../models/Incident'
import mongoose from 'mongoose'


module.exports.create = (req, res) => {
  let data = req.body
  let newIncident = new Incident()

  newIncident.name = data.name
  if (data.status) newIncident.status = data.status
  newIncident.priority = data.priority
  newIncident.category = data.category
  newIncident.client = mongoose.Types.ObjectId(data.client)
  if (data.technician) newIncident.technician = mongoose.Types.ObjectId(data.technician)
  newIncident.dependence = mongoose.Types.ObjectId(data.dependence)
  newIncident.registeredBy = mongoose.Types.ObjectId(data.registeredBy)

  if (req.file) newIncident.photo = 'http://' + req.headers.host + req.file.path.substring(6, req.file.path.length)

  newIncident.save((err, incident) => {
      if (err) return res.sendStatus(503)
      if (!incident) return res.sendStatus(404)
      Incident.findOne({_id: incident._id}).populate('client').populate('dependence').populate('client').populate('technician').exec((err, incident) => {
        if (err) return res.sendStatus(503)
        if (!incident) return res.sendStatus(404)
        return res.json(incident)
      })
  });
}

module.exports.read = (req, res) => {
  Incident.find({}).populate('client').populate('dependence').populate('client').populate('technician').exec((err, incident) => {
    if (err) return res.sendStatus(503)
    if (!incident) return res.sendStatus(404)
    return res.json(incident)
  })
}

module.exports.readBy = (req, res) => {
  let filters = req.body
  Incident.find(filters).populate('client').populate('dependence').populate('client').populate('technician').exec((err, incident) => {
    if (err) return res.sendStatus(503)
    if (!incident) return res.sendStatus(404)
    return res.json(incident)
  })
}

module.exports.getOne = (req, res) => {
  let id = req.params.id

  Incident.findOne({_id: id}).populate('client').populate('dependence').populate('client').populate('technician').exec((err, incident) => {
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
    Incident.findOne({_id: incident._id}).populate('client').populate('dependence').populate('client').populate('technician').exec((err, incident) => {
      if (err) return res.sendStatus(503)
      if (!incident) return res.sendStatus(404)
      return res.json(incident)
    })
  })
}

module.exports.delete = (req, res) => {
  let id = req.params.id

  Incident.findOneAndRemove({_id: id}, (err) => {
    if (err) return res.sendStatus(503)
    return res.json(200)
  })
}
