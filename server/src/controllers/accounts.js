import { Driver } from "../models/driver.js";
import { Manager } from "../models/manager.js";

class AccountsController {
  createAccount = async (req, res) => {
    const body = req.body
    
    let user = null;
    if (req.query.type == "manager") {
      user = new Manager(body)
    } else if (req.query.type == "driver") {
      user = new Driver(body)
    } else {
      return res.status(400).json({"type": `Invalid account type ${req.query.type}`})
    }

    user.save()
      .then(() => {
        return res.status(201).json(user);
      })
      .catch(err => {
        if (err.name === "ValidationError") {
          const errors = {}
          Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message
          });
        
          return res.status(400).json(errors)
        } else if (err.message.startsWith("Invalid reference")) {
          return res.status(400).json({"company_id": err.message})
        } else if (err.message.startsWith("Duplicate key")) {
          return res.status(400).json({"id": err.message})
        } else {
          console.log("createUser: " + err)
          return res.status(500).json(err)
        }
      });
  };

  login = async (req, res) => {
    const body = req.body

    let user = null;
    if (req.query.type == "manager") {
      user = await Manager.findOne({id: body.id})
    } else if (req.query.type == "driver") {
      user = await Driver.findOne({id: body.id})
    } else {
      return res.status(400).json({"type": `Invalid account type ${req.query.type}`})
    }
    if (user === null) return res.status(400).json({"id": `${req.query.type} id ${body.id} not found`})

    if (user.password === body.password) {
      return res.status(200).json(user)
    } else {
      return res.status(400).json({"password": `incorrect password ${body.password} for ${req.query.type} id ${body.id}`})
    }
  }
}
    
export { AccountsController };