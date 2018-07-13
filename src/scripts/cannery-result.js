// load local .env to process.env
require('dotenv').config()

// TODO: `fetch` instead of fs so query can be remote as well as local
const path = require('path')
const fs = require('fs')

// connect to $DATABASE_URL
const db = require('pg-db')()
// import config object
const CANNERY_CONFIG = require('./cannery-config')
const query = CANNERY_CONFIG.queryName
const params = CANNERY_CONFIG.queryParams || {}
const output = CANNERY_CONFIG.outputName || CANNERY_CONFIG.queryName


function writeOutput(rows) {
  fs.writeFile(
    path.resolve(__dirname, '../../public/') + path.sep + output + '.json',
    JSON.stringify(rows),
    () => {
      console.log('done!')
    })
}

// read query from file
// TODO: 
//   - frontmatter parsing
//   - export this as function for serverless use
fs.readFile(
  path.resolve(__dirname, './queries/') + path.sep + query + '.sql',
  'utf8',
  // submit query to db
  (err, data) => {
    if (err) throw err
    db.query(
      data, 
      params,
      // write results to JSON file in /public
      // TODO: include supplemental metadata/additional formatting options in output
      (err, rows) => {
        if (err) {
          // fallback to sqlite for build/test without Postgres connection
          console.log('Warning: no Postgres connection, trying sqlite...')
          const sqlite3 = require('sqlite3')
          lite = new sqlite3.Database(':memory:')
          // Prepend `:` to parameter keys for sqlite 😠
          liteParams = Object.assign({}, ...Object.keys(params).map(key => {
            var newKey = ':' + key
            return {
              [newKey]: params[key]
            }
          }))
          lite.all(
            data,
            liteParams,
            function (err, rows) {
              if (err) throw err
              writeOutput(rows)
            }
          )
        } else {
          writeOutput(rows)
        }
    })
  }
)