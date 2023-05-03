/* eslint-disable max-len */
import { app, server } from '../../src/index.js';
import { Manager } from '../../src/models/manager.js';
import { Company } from '../../src/models/company.js';
import { expect } from 'chai';
import { describe, it, before, after } from 'mocha';
import request from 'supertest';

describe('Testing Managers controller', function() {
  before(function (done) {
    const c1 = new Company({id: 'c1', name: 'Flurry'});
    const m1 = new Manager({id: 'm_M1', name: 'Admin', company_id: "c1", password: "password"});
    c1.save().then(() => {
        m1.save().then(() => {
          done()
        }).catch(err => done(err))
    }).catch(err => done(err))
  });

  describe('View manager by ID', function() {
    it('1. View an existing manager', function (done) {
      request(app)
        .get(`/api/managers/m_M1`)
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.name).to.equal('Admin'); 
          expect(res.body.company_id).to.equal('c1');
          done();
        });
    });

    it('2. View a non-existing driver', (done) => {
      request(app)
        .get(`/api/managers/random`)
        .then((res) => {
          expect(res.statusCode).to.equal(404);
          done();
        }).catch((err) => done(err))
    });
  });
  
  after(function(done) {
    Manager.deleteMany().then(() => {
      server.close();
      done();
    }).catch(err => done(err))
  });

});