import { model } from 'mongoose';

const companySchema = ({
  id: {
    type: String,
    required: true,
    match: /^[A-Za-z0-9_]+$/,
  },
  name: {
    type: String,
    required: true,
  },
});

const Company = model('Company', companySchema);
export {Company};
