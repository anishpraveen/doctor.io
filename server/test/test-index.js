var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var chaiAsPromised = require("chai-as-promised");

const expect    = require('chai').expect

// Write assertions! 

chai.use(chaiHttp);
chai.use(chaiAsPromised);


describe('Search', function () {
    it('Page', function (done) {
        var body = {
            name: 'j', days: 'Monday',time: '9,17',cost: 'slab2',jwt:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvb3RAYWRtaW4uY29tIiwidXNlciI6InJvb3QiLCJ1c2VySUQiOiI1ODgwNWIzNDk3MGY2MzJlNDAwZmQxNDAifQ.F_-kyggsWiVHhJF11B27Xko9Jgw92dxrJRk8X8oZ6ds'
        };
        chai.request(server)
            .get('/api/doctors')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(body)
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('API Valid Search', function (done) {
        var body = {
            name: 'j', days: 'Monday',time: '9,17',cost: 'slab2',jwt:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvb3RAYWRtaW4uY29tIiwidXNlciI6InJvb3QiLCJ1c2VySUQiOiI1ODgwNWIzNDk3MGY2MzJlNDAwZmQxNDAifQ.F_-kyggsWiVHhJF11B27Xko9Jgw92dxrJRk8X8oZ6ds'
        };
        chai.request(server)
            .get('/api/doctors')
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
            name: 'j', days: 'Monday',time: '9,17',cost: 'slab1',jwt:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvb3RAYWRtaW4uY29tIiwidXNlciI6InJvb3QiLCJ1c2VySUQiOiI1ODgwNWIzNDk3MGY2MzJlNDAwZmQxNDAifQ.F_-kyggsWiVHhJF11B27Xko9Jgw92dxrJRk8X8oZ6ds'
        };
        chai.request(server)
            .get('/api/doctors')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(body)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                // console.log(res.body);
                res.body.should.be.an('object');
                res.body.should.have.all.keys('response', 'msg');
                res.body.should.have.deep.property('response','-1');
                done();
            });
    });
    it('API Invalid Entry', function (done) {
        var body = {
            name: 'j', days: 'Monday',time: '9,17',cost: 'slab1'//,jwt:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvb3RAYWRtaW4uY29tIiwidXNlciI6InJvb3QiLCJ1c2VySUQiOiI1ODgwNWIzNDk3MGY2MzJlNDAwZmQxNDAifQ.F_-kyggsWiVHhJF11B27Xko9Jgw92dxrJRk8X8oZ6ds'
        };
        chai.request(server)
            .post('/api/doctors')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(body)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                // console.log(res.body);
                res.body.should.be.an('object');
                res.body.should.have.all.keys('response', 'msg');
                // res.body.should.have.deep.property('response','400');
                done();
            });
    });
});
