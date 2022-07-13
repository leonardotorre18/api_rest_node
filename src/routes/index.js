const routesMovies = require('./movies')

module.exports = app => {
  app.use('/movies', routesMovies)

  app.get('*', (req, res)=>{
    res.status(404).json({"error": "404", "message": "Not Found"})
  })
} 

