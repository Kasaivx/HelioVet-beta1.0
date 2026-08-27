import { login, register } from "../services/auth.service.js";

export async function clinicRegisterCtrlr(req,res){
try{
const result = await
register({...req.body,role:"CLINIC"})
res.status(201).json(result)

}catch (error){
 res.status(400).json({message:error.message})

}


}

export async function OwnerRegisterCtrlr(req, res) {

const orcr = req.body

console.log(orcr)

  try {
    const result = await register({ ...req.body, role:"OWNER"});
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}





export async function loginCtrlr(req,res){

try{
const result = await
login(req.body);
res.status(201).json(result)
    }catch (error){
res.status(400).json({message:error.message}) 
    }
};
