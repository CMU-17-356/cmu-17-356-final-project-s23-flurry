import { model } from 'mongoose';

const managerSchema = ({
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

const Manager = model('Manager', managerSchema);
export { Manager };
