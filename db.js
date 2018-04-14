const mongoose = require('mongoose')

// const PROD_URI = "mongodb://admin:123456@dsxxxx.mlab.com:41039/incidentdb"
const DEV_URI = "mongodb://localhost:27017/incidenciasapi"

function connect(url) {
  return mongoose.connect(url)
}

module.exports = async function() {
  let databases = await Promise.all([connect(DEV_URI)])

  return {
    dev: databases[0]
  }
}
