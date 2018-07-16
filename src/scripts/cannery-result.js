// load local .env to process.env
require('dotenv').config()
// TODO: `fetch` instead of fs so query can be remote as well as local
const path = require('path')
const fs = require('fs')

// read a query from /src/scripts/queries
function readQuery(name) {
  query = fs.readFileSync(
    path.resolve(__dirname, './queries/') + path.sep + name + '.sql',
    'utf8'
  )
  return query
}

// write results to JSON file in /public
// TODO: fetch.method: post (to cloud storage, etc) instead of fs
function writeOutput(output, rows) {
  fs.writeFile(
    path.resolve(__dirname, '../../public/') + path.sep + output + '.json',
    JSON.stringify(rows),
    () => {
      console.log('done!')
    })
}

// TODO: export query result method so it can be serverless function
if (process.env.DATABASE_URL.indexOf('sqlite') !== -1) {
  const sqlite3 = require('sqlite3')
  lite = new sqlite3.Database(':memory:')
  lite.all(
    readQuery('test'),
    {':greeting': 'yo'},
    (err, rows) => {
      if (err) throw err
      writeOutput('test', rows)
    }
  )
} else {
  // connect to $DATABASE_URL
  const db = require('pg-db')()
  // import config object
  const CANNERY_CONFIG = require('./cannery-config')
  const query = CANNERY_CONFIG.queryName
  const params = CANNERY_CONFIG.queryParams || {}
  const output = CANNERY_CONFIG.outputName || CANNERY_CONFIG.queryName
  
  db.query(
    readQuery(query), 
    params,
    // TODO: include supplemental metadata/additional formatting options in output
    (err, rows) => {
      if (err) throw err
      writeOutput(output, rows)
  })
}