import { model, Schema } from 'mongoose';
import { Company } from './company.js';

const driverSchema = Schema({
  id: {
    type: String,
    required: true,
    match: /^[a-z0-9]+$/,
  },
  name: {
    type: String,
    required: true,
  },
  company_id: {
    type: String,
    required: true,
  }
});

// validate referential integrity
driverSchema.post('validate', function(doc, next) {
  Company.findOne({id: doc.company_id}).then(c => {
    if (c) {
      next()
    } else {
      next(new Error(`Invalid reference in driver: no company with id ${doc.company_id} found`))
    }
  }).catch(err => next(err))
});

const Driver = model('Driver', driverSchema);
export { Driver };
