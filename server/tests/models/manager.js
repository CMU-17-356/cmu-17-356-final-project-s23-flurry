/* eslint-disable max-len */

import { Manager } from '../../src/models/manager.js';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Testing Manager model', function() {
  it('1. Creating new manager', function(done) {
    const m = new Manager({id: 'm1', name: 'Admin', company_id: "c1"});
    m.validate().then(() => {
      expect(m.id).to.equal('m1');
      expect(m.name).to.equal('Admin');
      expect(m.company_id).to.equal('c1');
      done();
    })
    .catch(err => {
      done(new Error(`Should have passed validation, instead got ${err.message}`));
    });
  });

  it('2. Invalid if id is not alphanumeric', function(done) {
    const m = new Manager({id: 'm1.', name: 'Admin', company_id: "c1"});
    m.validate().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.id).to.exist;
      done();
    });
  });
});
