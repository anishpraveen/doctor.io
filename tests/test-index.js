var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

const expect    = require('chai').expect

// Write assertions! 

chai.use(chaiHttp);


describe('Search', function () {
    it('Page', function (done) {
        var body = {
            name: 'j', days: 'Monday',time: '9,17',cost: 'slab2'
        };
        chai.request(server)
            .get('/users/drlist')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('API Valid Search', function (done) {
        var body = {
            name: 'j', days: 'Monday',time: '9,17',cost: 'slab2'
        };
        chai.request(server)
            .post('/users/drlistAPI')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(body)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('name');
                res.body[0].name.should.equal('Johannes Kepler');
                done();
            });
    });

    it('API Invalid Search', function (done) {
        var body = {
            name: 'j', days: 'Monday',time: '9,17',cost: 'slab1'
        };
        chai.request(server)
            .post('/users/drlistAPI')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(body)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                // console.log(res.body);
                res.body.should.be.a('array');
                res.body[0].should.have.property('response');
                res.body[0].response.should.equal('-1');
                res.body[1].should.have.property('msg');
                done();
            });
    });
});
