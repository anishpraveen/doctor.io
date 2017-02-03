var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

const expect    = require('chai').expect
// Write assertions! 

chai.use(chaiHttp);

describe('Login', function () {
    it('Available', function (done){
        chai.request(server)
            .get('/login')
            .end(function (err, res){
                res.should.have.status(200);
                done();
            })
    });
});
