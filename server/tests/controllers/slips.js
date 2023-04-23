/* eslint-disable max-len */
import { app, server } from '../../src/index.js';
import { Slip } from "../../src/models/slip.js";
import { Driver } from '../../src/models/driver.js';
import { Company } from '../../src/models/company.js';
import { expect } from 'chai';
import { describe, it, before, beforeEach, after, afterEach } from 'mocha';
import request from 'supertest';

describe('Testing Slips controller', function() {
  before(function (done) {
    const c1 = new Company({id: 'c1', name: 'Flurry'});
    const c2 = new Company({id: 'c2', name: 'Dronut'});
    const d1 = new Driver({id: 'd1', name: 'Driver', company_id: "c1"});
    const d2 = new Driver({id: 'd2', name: 'Driver (2)', company_id: "c1"});
    const d3 = new Driver({id: 'd3', name: 'Driver (3)', company_id: "c2"});
    c1.save().then(() => {
      c2.save().then(() => {
        d1.save().then(() => {
          d2.save().then(() => {
            d3.save().then(() => {
              done();
            }).catch(err => done(err))
          }).catch(err => done(err))
        }).catch(err => done(err))
      }).catch(err => done(err))
    }).catch(err => done(err))
  });

  describe('View slip by ID', function() {
    it('1. View an existing slip', function (done) {
      const s = new Slip({id: 's1', latitude: -87.46, longitude: 180, timestamp: new Date('2023-01-30T23:05:20.000-08:00'), driver_id: 'd1', slip_score: 50.88});
      s.save().then(() => {
        request(app)
          .get(`/api/slips/${s.id}`)
          .then((res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.timestamp).to.equal('2023-01-31T07:05:20.000Z'); 
            expect(res.body.driver_id).to.equal('d1');
            expect(res.body.slip_score).to.equal(50.88);
            done();
          }).catch(err => done(err))
      }).catch(err => done(err))
    });

    it('2. View a non-existing slip', (done) => {
      const s = new Slip({id: 's1', latitude: -87.46, longitude: 180, timestamp: new Date('2023-01-30T23:05:20.000-08:00'), driver_id: 'd1', slip_score: 50.88}); // not saved
      request(app)
        .get(`/api/slips/${s.id}`)
        .then((res) => {
          expect(res.statusCode).to.equal(404);
          done();
        }).catch((err) => done(err))
    });
  });

  describe('View slips filtered by company or driver id', function() {
    beforeEach(function (done) {
      const s1 = new Slip({id: 's1', latitude: -87.46, longitude: 180, timestamp: new Date(1645500000000), driver_id: 'd1', slip_score: 50.88});
      const s2 = new Slip({id: 's2', latitude: -43, longitude: 37.35, timestamp: new Date(1518200000000), driver_id: 'd2', slip_score: 73.92});
      const s3 = new Slip({id: 's3', latitude: 0, longitude: 3.97, timestamp: new Date(1037300000000), driver_id: 'd3', slip_score: 99.99});
      const s4 = new Slip({id: 's4', latitude: 12.54, longitude: -26.88, timestamp: new Date(1326600000000), driver_id: 'd1', slip_score: 15});
      s1.save().then(() => {
        s2.save().then(() => {
          s3.save().then(() => {
            s4.save().then(() => {
              done();
            }).catch(err => done(err))
          }).catch(err => done(err))
        }).catch(err => done(err))
      }).catch(err => done(err))
    });

    it('1. View slips with company id', function (done) {
      request(app)
        .get(`/api/slips?company_id=c1`)
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.length(3);
          expect(res.body[0].id).to.equal('s1');
          expect(res.body[1].id).to.equal('s2');
          expect(res.body[2].id).to.equal('s4');
          done();
        }).catch(err => done(err))
    });

    it('2. View slips with driver id', function (done) {
      request(app)
        .get(`/api/slips?driver_id=d1`)
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.length(2);
          expect(res.body[0].id).to.equal('s1');
          expect(res.body[1].id).to.equal('s4');
          done();
        }).catch(err => done(err))
    });

    it('3. View slips with multiple filters', function (done) {
      request(app)
        .get(`/api/slips?driver_id=d1&company_id=c1&before=1612000000000`)
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.length(1);
          expect(res.body[0].id).to.equal('s4');
          done();
        }).catch(err => done(err))
    });
  });

  describe('View all slips, optionally filter by date', function() {
    beforeEach(function (done) {
      const s1 = new Slip({id: 's1', latitude: -87.46, longitude: 180, timestamp: new Date(1645500000000), driver_id: 'd1', slip_score: 50.88});
      const s2 = new Slip({id: 's2', latitude: -43, longitude: 37.35, timestamp: new Date(1518200000000), driver_id: 'd2', slip_score: 73.92});
      const s3 = new Slip({id: 's3', latitude: 0, longitude: 3.97, timestamp: new Date(1037300000000), driver_id: 'd3', slip_score: 99.99});
      s1.save().then(() => {
        s2.save().then(() => {
          s3.save().then(() => {
            done();
          }).catch(err => done(err))
        }).catch(err => done(err))
      }).catch(err => done(err))
    });

    it('1. View all slips', function (done) {
      request(app)
        .get(`/api/slips`)
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.length(3);
          expect(res.body[0].id).to.equal('s1'); 
          expect(res.body[1].id).to.equal('s2'); 
          expect(res.body[2].id).to.equal('s3'); 
          done();
        }).catch(err => done(err))
    });

    it('2. View slips before a certain date (inclusive)', function (done) {
      request(app)
        .get(`/api/slips?before=1518200000000`)
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.length(2);
          expect(res.body[0].id).to.equal('s2'); 
          expect(res.body[1].id).to.equal('s3'); 
          done();
        }).catch(err => done(err))
    });

    it('3. View slips after a certain date (inclusive)', function (done) {
      request(app)
        .get(`/api/slips?after=1645500000000`)
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.length(1);
          expect(res.body[0].id).to.equal('s1'); 
          done();
        }).catch(err => done(err))
    });

    it('4. View slips between a certain interval (inclusive)', function (done) {
      request(app)
        .get(`/api/slips?after=1037300000001&before=1738200000000`)
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.length(2);
          expect(res.body[0].id).to.equal('s1'); 
          expect(res.body[1].id).to.equal('s2'); 
          done();
        }).catch(err => done(err))
    });
  });

  afterEach(function (done) {
    Slip.deleteMany().then(() => {
      done()
    }).catch(err => done(err))     
  });
  
  after(function(done) {
    Slip.deleteMany().then(() => {
      Driver.deleteMany().then(() => {
        Company.deleteMany().then(() => {
          server.close();
          done();
        }).catch(err => done(err))
      }).catch(err => done(err))
    }).catch(err => done(err))     
  });

});