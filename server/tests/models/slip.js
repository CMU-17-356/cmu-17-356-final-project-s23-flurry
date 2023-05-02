/* eslint-disable max-len */

import { Slip } from '../../src/models/slip.js';
import { Driver } from '../../src/models/driver.js';
import { Company } from '../../src/models/company.js';
import { expect } from 'chai';
import { describe, it, before, afterEach, after } from 'mocha';

describe('Testing Slip model', function() {
  before(function (done) {
    const c = new Company({id: 'c1', name: 'Flurry'});
    const d = new Driver({id: 'd1', name: 'Driver', company_id: 'c1', password: "password"});
    c.save().then(() => {
      d.save().then(() => {
        done();
      }).catch(err => done(err))
    }).catch(err => done(err))
  });

  it('1. Creating new slip', function(done) {
    const s = new Slip({id: 's_S1', latitude: -87.46, longitude: 180, timestamp: new Date('2022-02-22T10:08:00.000-05:00'), driver_id: 'd1', slip_score: 50.88});
    s.save().then(() => {
      expect(s.id).to.equal('s_S1');
      expect(s.latitude).to.equal(-87.46);
      expect(s.longitude).to.equal(180);
      expect(s.timestamp.valueOf()).to.equal(new Date(1645542480000).valueOf());
      expect(s.driver_id).to.equal('d1');
      expect(s.slip_score).to.equal(50.88);
      done();
    })
    .catch(err => {
      done(new Error(`Should have passed validation, instead got ${err.message}`));
    });
  });

  it('2. Invalid if id is not alphanumeric or underscore', function(done) {
    const s = new Slip({id: 's1-', latitude: 45, longitude: -45, timestamp: Date.now(), driver_id: 'd1', slip_score: 99.99});
    s.save().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.id).to.exist;
      done();
    }).catch(err => done(err))
  });

  it('3. Invalid if latitude out of range', function(done) {
    const s = new Slip({id: 's1', latitude: -90.001, longitude: -180, timestamp: Date.now(), driver_id: 'd1', slip_score: 99.99});
    s.save().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.latitude).to.exist;
      done();
    }).catch(err => done(err))
  });

  it('4. Invalid if longitude out of range', function(done) {
    const s = new Slip({id: 's1', latitude: 90, longitude: 180.001, timestamp: Date.now(), driver_id: 'd1', slip_score: 99.99});
    s.save().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.longitude).to.exist;
      done();
    }).catch(err => done(err))
  });

  it('5. Invalid if slip score out of range', function(done) {
    const s = new Slip({id: 's1', latitude: 90, longitude: 180, timestamp: Date.now(), driver_id: 'd1', slip_score: 100.001});
    s.save().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.slip_score).to.exist;
      done();
    }).catch(err => done(err))
  });

  it('6. Invalid if duplicate id', function(done) {
    const s1 = new Slip({id: 's1', latitude: 90, longitude: 180, timestamp: Date.now(), driver_id: 'd1', slip_score: 15});
    const s2 = new Slip({id: 's1', latitude: -54, longitude: 96, timestamp: Date.now(), driver_id: 'd1', slip_score: 74});
    s1.save().then(() => {
      s2.save().then(() => done(new Error("Should have failed to save")))
      .catch(err => {
        expect(err.message).to.equal(`Duplicate key in slip: id ${s1.id} already exists`);
        done();
      }).catch(err => done(err))
    }).catch(err => done(err))
  });

  it('7. Invalid if referencing non-existing driver id', function(done) {
    const s = new Slip({id: 's1', latitude: 90, longitude: 180, timestamp: Date.now(), driver_id: 'ddd', slip_score: 15});
    s.save().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.message).to.equal(`Invalid reference in slip: no driver with id ${s.driver_id} found`);
      done();
    }).catch(err => done(err))
  });

  afterEach(function (done) {
    Slip.deleteMany().then(() => {
      done()
    }).catch(err => done(err))
  });

  after(function (done) {
    Slip.deleteMany().then(() => {
      Driver.deleteMany().then(() => {
        Company.deleteMany().then(() => {
          done()
        }).catch(err => done(err))
      }).catch(err => done(err))
    }).catch(err => done(err))
  });

});
