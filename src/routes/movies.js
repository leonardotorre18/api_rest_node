const { Router } = require('express');
const routes = Router();
const data = require('../json/movies.json')


routes.get('/', (req, res)=> {
  res.json(data)
})
routes.get('/netflix', (req, res) => {
  res.json(data.filter(r => r.platform == "Netflix" ))
})
routes.get('/hbo', (req, res) => {
  res.json(data.filter(r => r.platform == "HBO" ))
})
routes.get('/disney', (req, res) => {
  res.json(data.filter(r => r.platform == "Disney" ))
})
routes.get('/id/:id', (req, res)=>{
  res.json(data.filter(r => r.id == req.params.id ))
})

module.exports = routes;