import {getP,deleteP,updateP,creatP, searchpatients} from "../repos/patient.repository.js"
import {prisma} from "../config/db.js"
export async function getPatients(req,res) {
  const { search } = req.query;
  try{

    if(search){
const results = await searchpatients(search)
if(results.length === 0){

res.status(404).json({message:"patients not found"})

}else{
  res.status(200).json({message:"patients were found", data:results})
}

    }else{


    const patientsReq =
    await getP()

    
    res.status(200).json({ message: "patients were fetched succefully", data: patientsReq });}
}catch (error){
    res.status(400).json({message:error.message})



}}
 export async function deletePatients(req,res) {
     const id = Number(req.params.id);
    
    try{
    const patientDel = await deleteP(id)
    
    res.status(200).json({message:"patient was deleted succfully",
      data:patientDel
    });
     }
     catch(error){

 res.status(400).json({message:error.message
 })

    }
 }

 export async function editPaitent(req,res) {
    const id = Number(req.params.id)
    try{


    const patientEdit = await updateP(id, req.body )
      
    res.status(200).json({ message: "patient was edited succefully",
         data: patientEdit });
    }catch (error){
          
     
        res.status(400).json({message:error.message})
          


    }
 }
  
 export async function creatPatient(req,res) {
    try{
   const owner = await prisma.owner.findUnique({
     where: { id: req.body.ownerId },
   });

   if (!owner) {
     return res.status(404).json({
       message: "owner not found",
     });
   }
  
             
           const createdPatient = await creatP({...req.body, age:req.body.age ? Number(req.body.age) : null, ownerId:owner.id})
           console.log("CREATED:", createdPatient);

           
           res.status(201).json({message:"patinet created succefully"
            ,data:createdPatient
           })

    }catch(error){


 res.status(400).json({message:error.message})

}

    }



