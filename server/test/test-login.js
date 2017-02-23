var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

const expect    = require('chai').expect
// Write assertions! 

chai.use(chaiHttp);

describe('Login', function () {
    it('Available', function (done){
        var body = {
            username: 'root', password: 'root12'
        };
        chai.request(server)
            .get('/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            // .send(body)
            .end(function (err, res){
                res.should.have.status(200);
                // console.log(res)
                done();
            })
    });
});
