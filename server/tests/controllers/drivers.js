/* eslint-disable max-len */
import { app, server } from '../../src/index.js';
import { Driver } from '../../src/models/driver.js';
import { Company } from '../../src/models/company.js';
import { expect } from 'chai';
import { describe, it, before, after } from 'mocha';
import request from 'supertest';

describe('Testing Drivers controller', function() {
  before(function (done) {
    const c1 = new Company({id: 'c1', name: 'Flurry'});
    const c2 = new Company({id: 'c2', name: 'Dronut'});
    const d1 = new Driver({id: 'd1', name: 'Driver', company_id: "c1", password: "password1"});
    const d2 = new Driver({id: 'd2', name: 'Driver (2)', company_id: "c1", password: "password2"});
    const d3 = new Driver({id: 'd3', name: 'Driver (3)', company_id: "c2", password: "password3"});
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

  describe('View driver by ID', function() {
    it('1. View an existing driver', function (done) {
      request(app)
        .get(`/api/drivers/d1`)
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.name).to.equal('Driver'); 
          expect(res.body.company_id).to.equal('c1');
          done();
        });
    });

    it('2. View a non-existing driver', (done) => {
      request(app)
        .get(`/api/drivers/random`)
        .then((res) => {
          expect(res.statusCode).to.equal(404);
          done();
        }).catch((err) => done(err))
    });
  });

  describe('View drivers, optionally filtered by company id', function() {
    it('1. View all drivers', function (done) {
      request(app)
        .get(`/api/drivers`)
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.length(3);
          expect(res.body[0].id).to.equal('d1');
          expect(res.body[1].id).to.equal('d2');
          expect(res.body[2].id).to.equal('d3');
          done();
        }).catch(err => done(err))
    });

    it('2. View drivers with company id', function (done) {
      request(app)
        .get(`/api/drivers?company_id=c1`)
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.length(2);
          expect(res.body[0].id).to.equal('d1');
          expect(res.body[1].id).to.equal('d2');
          done();
        }).catch(err => done(err))
    });
  });
  
  after(function(done) {
    Driver.deleteMany().then(() => {
      server.close();
      done();
    }).catch(err => done(err))
  });

});