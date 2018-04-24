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
