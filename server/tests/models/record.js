/* eslint-disable max-len */

import { Record } from '../../src/models/record.js';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Testing Record model', function() {
  it('1. Creating new record', function(done) {
    const r = new Record({id: 'r1', latitude: -87.46, longitude: 180, timestamp: new Date('2022-02-22T10:08:00.000-05:00'), driver_id: 'd1', slip_score: 50.88});
    r.validate(function() {
      expect(r.id).to.equal('r1');
      expect(r.latitude).to.equal(-87.46);
      expect(r.longitude).to.equal(180);
      expect(r.timestamp.valueOf()).to.equal(new Date(1645542480000).valueOf());
      expect(r.driver_id).to.equal('d1');
      expect(r.slip_score).to.equal(50.88);
      done();
    });
  });

  it('2. Invalid if id is not alphanumeric', function(done) {
    const r = new Record({id: 'r1_', latitude: 45, longitude: -45, timestamp: Date.now(), driver_id: 'd1', slip_score: 99.99});
    r.validate(function(err) {
      if (err) {
        expect(err.errors.id).to.exist;
        done();
      }
    });
  });

  it('3. Invalid if latitude out of range', function(done) {
    const r = new Record({id: 'r1', latitude: -90.001, longitude: -180, timestamp: Date.now(), driver_id: 'd1', slip_score: 99.99});
    r.validate(function(err) {
      if (err) {
        expect(err.errors.latitude).to.exist;
        done();
      }
    });
  });

  it('4. Invalid if longitude out of range', function(done) {
    const r = new Record({id: 'r1', latitude: 90, longitude: 180.001, timestamp: Date.now(), driver_id: 'd1', slip_score: 99.99});
    r.validate(function(err) {
      if (err) {
        expect(err.errors.longitude).to.exist;
        done();
      }
    });
  });

  it('5. Invalid if slip score out of range', function(done) {
    const r = new Record({id: 'r1', latitude: 90, longitude: 180, timestamp: Date.now(), driver_id: 'd1', slip_score: 100.001});
    r.validate(function(err) {
      if (err) {
        expect(err.errors.slip_score).to.exist;
        done();
      }
    });
  });
});
