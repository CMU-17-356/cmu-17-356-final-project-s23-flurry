import { Slip } from "../models/slip.js";
import { Driver } from "../models/driver.js";

class SlipsController {
  getSlips = async (req, res) => {
    let conditions = {}
    if (req.query.driver_id != null) {
      conditions["driver_id"] = req.query.driver_id
    }
    if (req.query.before != null) {
      conditions["timestamp"] = {$lte: new Date(Number(req.query.before))}
    }
    if (req.query.after != null) {
      conditions["timestamp"] = {$gte: new Date(Number(req.query.after))}
    }

    Slip.find(conditions)
      .then(async slips => {
        if (req.query.company_id != null) {
          const filters = await Promise.all(slips.map(async (s) => {
            const d = await Driver.findOne({id: s.driver_id})
            return (d && d.company_id === req.query.company_id)
          }));
          // eslint-disable-next-line
          return res.status(200).json(slips.filter((s, idx, arr) => {return filters[idx]}))
        } else {
          return res.status(200).json(slips)
        }
      })
      .catch(err => {
        console.log("getSlips: " + err)
        return res.status(500).json(err)
      });
  };
    
  getSlipById = async (req, res) => {
    const id = req.params.id
    Slip.findOne({id: id})
      .then(user => {
        if (user) {
          return res.status(200).json(user)
        }
        return res.status(404).json(`Slip ${id} not found`)
      })
      .catch(err => {
        console.log("getSlipById: " + err)
        return res.status(500).json(err)
      });
  }; 
}
  
export { SlipsController };