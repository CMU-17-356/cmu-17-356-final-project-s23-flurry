import { model, Schema } from 'mongoose';
import { Company } from './company.js';

const managerSchema = Schema({
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
managerSchema.post('validate', function(doc, next) {
  Company.findOne({id: doc.company_id}).then(c => {
    if (c) {
      next()
    } else {
      next(new Error(`Invalid reference in manager: no company with id ${doc.company_id} found`))
    }
  }).catch(err => next(err))
});

const Manager = model('Manager', managerSchema);
export { Manager };
