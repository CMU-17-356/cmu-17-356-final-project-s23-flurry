import { Driver } from "../models/driver.js";

class DriversController {
  getDrivers = async (req, res) => {
    let conditions = {}
    if (req.query.company_id != null) {
      conditions["company_id"] = req.query.company_id
    }

    Driver.find(conditions)
      .then(async drivers => {
          return res.status(200).json(drivers)
      })
      .catch(err => {
          console.log("getDrivers: " + err)
          return res.status(500).json(err)
      });
  };
    
  getDriverById = async (req, res) => {
    const id = req.params.id
    Driver.findOne({id: id})
      .then(driver => {
        if (driver) {
          return res.status(200).json(driver)
        }
        return res.status(404).json(`Driver ${id} not found`)
      })
      .catch(err => {
        console.log("getDriverById: " + err)
        return res.status(500).json(err)
      });
  }; 
}
  
export { DriversController };