/* eslint-disable max-len */

import { Slip } from '../../src/models/slip.js';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Testing Slip model', function() {
  it('1. Creating new slip', function(done) {
    const s = new Slip({id: 's1', latitude: -87.46, longitude: 180, timestamp: new Date('2022-02-22T10:08:00.000-05:00'), driver_id: 'd1', slip_score: 50.88});
    s.validate().then(() => {
      expect(s.id).to.equal('s1');
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

  it('2. Invalid if id is not alphanumeric', function(done) {
    const s = new Slip({id: 's1_', latitude: 45, longitude: -45, timestamp: Date.now(), driver_id: 'd1', slip_score: 99.99});
    s.validate().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.id).to.exist;
      done();
    });
  });

  it('3. Invalid if latitude out of range', function(done) {
    const s = new Slip({id: 's1', latitude: -90.001, longitude: -180, timestamp: Date.now(), driver_id: 'd1', slip_score: 99.99});
    s.validate().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.latitude).to.exist;
      done();
    });
  });

  it('4. Invalid if longitude out of range', function(done) {
    const s = new Slip({id: 's1', latitude: 90, longitude: 180.001, timestamp: Date.now(), driver_id: 'd1', slip_score: 99.99});
    s.validate().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.longitude).to.exist;
      done();
    });
  });

  it('5. Invalid if slip score out of range', function(done) {
    const s = new Slip({id: 's1', latitude: 90, longitude: 180, timestamp: Date.now(), driver_id: 'd1', slip_score: 100.001});
    s.validate().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.slip_score).to.exist;
      done();
    });
  });
});
