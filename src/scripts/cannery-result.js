// load local .env to process.env
require('dotenv').config()

// TODO: `fetch` instead of fs so query can be remote as well as local
const fs = require('fs')

// connect to $DATABASE_URL
const db = require('pg-db')()
// import config object
const CANNERY_CONFIG = require('./cannery-config')

// read query from file
// TODO: 
//   - frontmatter parsing
//   - export this as function for serverless use
fs.readFile(
  './queries/' + CANNERY_CONFIG.queryName + '.sql',
  'utf8',
  // submit query to db
  (err, data) => {
    if (err) throw err
    const params = CANNERY_CONFIG.queryParams || {}
    db.query(
      data, 
      params,
      // write results to JSON file in /public
      // TODO: include supplemental metadata/additional formatting options in output
      (err, rows) => {
        if (err) throw err
        const output = CANNERY_CONFIG.outputName || CANNERY_CONFIG.queryName
        fs.writeFile(
          '../../public/' + output +'.json',
          JSON.stringify(rows),
          () => {
            console.log('done!')
      })
    })
  }
)