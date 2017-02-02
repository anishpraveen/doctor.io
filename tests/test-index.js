var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

const expect    = require('chai').expect

// Write assertions! 

chai.use(chaiHttp);


describe('Users', function () {
    it('Search', function (done) {
        var body = {
            name: 'j', days: 'Monday',time: '9,17',cost: 'slab2'
        };
        chai.request(server)
            .post('/users/search')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({name: 'j', days: 'Monday',time: '9,17',cost: 'slab2'})
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('login', function (done){
        chai.request(server)
            .get('/login')
            .end(function (err, res){
                res.should.have.status(200);
                done();
            })
    });
    // it('should add a SINGLE blob on /blobs POST');
    // it('should update a SINGLE blob on /blob/<id> PUT');
    // it('should delete a SINGLE blob on /blob/<id> DELETE');
});
