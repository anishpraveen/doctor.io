// controller = require('../controllers/welcome')
//   , http_mocks = require('node-mocks-http')
//   , should = require('should')

// function buildResponse() {
//   return http_mocks.createResponse({eventEmitter: require('events').EventEmitter})
// }

// describe('Welcome Controller Tests', function() {

//   it('hello', function(done) {
//     var response = buildResponse()
//     var request  = http_mocks.createRequest({
//       method: 'GET',
//       url: '/hello',
//     })

//     response.on('end', function() {
//       response._getData().should.equal('world');
//       done()
//     })

//     controller.handle(request, response)
//   })

//   it('hello fail', function(done) {
//     var response = buildResponse()
//     var request  = http_mocks.createRequest({
//       method: 'POST',
//       url: '/hello',
//     })

//     response.on('end', function() {
//       // POST method should not exist.
//       // This part of the code should never execute.
//       done(new Error("Received a response"))
//     })

//     controller.handle(request, response, function() {
//       done()
//     })
//   })

//   it('upper', function(done) {
//     var response = buildResponse()
//     var request  = http_mocks.createRequest({
//       method: 'GET',
//       url: '/upper/monkeys',
//     })

//     response.on('end', function() {
//       response._getData().should.equal('MONKEYS');
//       done()
//     })

//     controller.handle(request, response)
//   })
// })