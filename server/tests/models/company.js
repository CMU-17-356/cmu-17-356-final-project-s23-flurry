/* eslint-disable max-len */

import { Company } from '../../src/models/company.js';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Testing Company model', function() {
  it('1. Creating new company', function(done) {
    const c = new Company({id: 'c1', name: 'Flurry'});
    c.validate(function() {
      expect(c.id).to.equal('c1');
      expect(c.name).to.equal('Flurry');
      done();
    });
  });

  it('2. Invalid if id is not alphanumeric', function(done) {
    const c = new Company({id: 'c1-', name: 'Flurry'});
    c.validate(function(err) {
      if (err) {
        expect(err.errors.id).to.exist;
        done();
      }
    });
  });
});
