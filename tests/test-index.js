var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

const expect    = require('chai').expect
const chaiHtml  = require('chai-html')
// Register the plugin 
chai.use(chaiHtml)
 
// Write assertions! 
expect('<div><img /></div>').html.to.equal('<div><img></div>')
expect('<h1>Hello World!</h1>').html.to.not.equal('<h1>Hallo Welt!</h1>')

chai.use(chaiHttp);


describe('Users', function () {
    it('Index', function (done) {
        chai.request(server)
            .get('/users/search')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    // it('should list a SINGLE blob on /blob/<id> GET');
    // it('should add a SINGLE blob on /blobs POST');
    // it('should update a SINGLE blob on /blob/<id> PUT');
    // it('should delete a SINGLE blob on /blob/<id> DELETE');
});

// var sinon = require('sinon');
// var chai = require('chai');
// var expect = chai.expect;

// var getUsers = require('../routes/login');

// describe("Routes", function() {
//   describe("GET Users", function() {

//       it("", function() {
//         var req,res,spy;
        
//         req = res = {};
//         spy = res.send = sinon.spy();
//         res.should.have.status(200);
//         getUsers(req, res);
//         expect(spy.calledOnce).to.equal(true);
//       });     

//   });
// });