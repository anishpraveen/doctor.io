var express = require('express')
  , router = express.Router()

router.get('/hello', function(req, res) {
  res.send('world')
})

router.get('/upper/:word', function(req, res) {
  res.send(req.params.word.toUpperCase())
})

module.exports = router