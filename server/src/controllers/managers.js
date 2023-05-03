import { Manager } from "../models/manager.js";

class ManagersController {
  getManagerById = async (req, res) => {
    const id = req.params.id
    Manager.findOne({id: id})
      .then(manager => {
        if (manager) {
          return res.status(200).json(manager)
        }
        return res.status(404).json(`Manager ${id} not found`)
      })
      .catch(err => {
        console.log("getManagerById: " + err)
        return res.status(500).json(err)
      });
  }; 
}
  
export { ManagersController };