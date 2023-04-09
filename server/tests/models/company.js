/* eslint-disable max-len */

import { Company } from '../../src/models/company.js';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Testing Company model', function() {
  it('1. Creating new company', function(done) {
    const c = new Company({id: 'c1', name: 'Flurry'});
    c.validate().then(() => {
      expect(c.id).to.equal('c1');
      expect(c.name).to.equal('Flurry');
      done();
    })
    .catch(err => {
      done(new Error(`Should have passed validation, instead got ${err.message}`));
    });
  });

  it('2. Invalid if id is not alphanumeric', function(done) {
    const c = new Company({id: 'c1-', name: 'Flurry'});
    c.validate().then(() => done(new Error("Should have failed validation")))
    .catch(err => {
      expect(err.errors.id).to.exist;
      done();
    });
  });
});
