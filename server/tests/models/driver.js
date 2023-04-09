/* eslint-disable max-len */

import { Driver } from '../../src/models/driver.js';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Testing Driver model', function() {
  it('1. Creating new driver', function(done) {
    const d = new Driver({id: 'd1', name: 'Driver', company_id: "c1"});
    d.validate().then(() => {
      expect(d.id).to.equal('d1');
      expect(d.name).to.equal('Driver');
      expect(d.company_id).to.equal('c1');
      done();
    })
    .catch(err => {
      done(new Error(`Should have passed validation, instead got ${err.message}`));
    });
  });

  it('2. Invalid if id is not alphanumeric', function(done) {
    const d = new Driver({id: 'd1 ', name: 'Driver', company_id: "c1"});
    d.validate().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.id).to.exist;
      done();
    })
  });
});
