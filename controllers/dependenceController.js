import Dependence from '../models/Dependence'

module.exports.create = (req, res) => {
  let data = req.body
  let newDependence = new Dependence()
  newDependence.name = data.name
  newDependence.acronym = data.acronym
  newDependence.annex = data.annex
  newDependence.latitude = data.latitude
  newDependence.longitude = data.longitude

  if (req.file) {
    newDependence.photo = 'http://' + req.headers.host + req.file.path.substring(6, req.file.path.length)
  }

  newDependence.save((err, dependence) => {
      if (err) return res.sendStatus(503)
      if (!dependence) return res.sendStatus(404)
      return res.json(dependence)
  });
}

module.exports.read = (req, res) => {
  Dependence.find({}).exec((err, dependence) => {
    if (err) return res.sendStatus(503)
    if (!dependence) return res.sendStatus(404)
    return res.json(dependence)
  })
}

module.exports.readBy = (req, res) => {
  let filters = req.body
  Dependence.find(filters).exec((err, dependence) => {
    if (err) return res.sendStatus(503)
    if (!dependence) return res.sendStatus(404)
    return res.json(dependence)
  })
}

module.exports.getOne = (req, res) => {
  let id = req.params.id

  Dependence.findOne({_id: id}).exec((err, dependence) => {
    if (err) return res.sendStatus(503)
    if (!dependence) return res.sendStatus(404)
    return res.json(dependence)
  })
}

module.exports.update = (req, res) => {
  let data = req.body
  let id = data._id
  delete data._id

  if (req.file) {
    data.photo = 'http://' + req.headers.host + req.file.path.substring(6, req.file.path.length)
  }

  Dependence.findOneAndUpdate({_id: id}, data, {new: true}, (err, dependence) => {
    if (err) return res.sendStatus(503)
    if (!dependence) return res.sendStatus(404)
    return res.json(dependence)
  })
}

module.exports.delete = (req, res) => {
  let id = req.params.id

  Dependence.findOneAndRemove({_id: id}, (err) => {
    if (err) return res.sendStatus(503)
    return res.json(200)
  })
}
