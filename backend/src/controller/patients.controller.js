import {getP,deleteP,updateP,creatP, searchpatients} from "../repos/patient.repository.js"
import {prisma} from "../config/db.js"
import { findOwnerByNID } from "../repos/user.repository.js";
import { genNanoID } from "../services/nanoid.service.js";
export async function getPatients(req,res) {
  console.log("waaaa l9lawy")
  const { search } = req.query;
  try{

    if(search){
const results = await searchpatients(search)
if(results.length === 0){

res.status(404).json({message:"patient not found"})

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
     where: { name: req.body.name},
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


     export async function vetCreatPatient(req, res) {
    try{
       console.log("1");
        const {owner, ...patient}= req.body || {};
        console.log("2");
        const patientData = patient
        const ownerdata = owner || {};
        console.log("3");
        const CownerNid = ownerdata.nid;
        const Guest = ownerdata.isGuest;

console.log("4", {
  CownerNid,
  Guest,
});
console.log("5 BEFORE CREATE");

      


        if (Guest === false){
         
          const findbyNid = await findOwnerByNID(ownerNid)
    
          if (!findbyNid){
            return res.status(404).json({
    message: "Owner not found"        });
            }
        }


          


console.log("BEFORE creatP");
        
             const creatPatient = await prisma.patient.create({
              data:{  PetName: patientData.petName,
               species: patientData.species,
               breed: patientData.breed,
               age: patientData.age,
               owner:
                 Guest === false
                   ? {
                       connect: { nid: ownerNid },
                     }
                   : {
                       create: {
                         nid: genNanoID("G"),
                         name: ownerdata.name,
                         phone: ownerdata.phone,
                         address: ownerdata.address,
                         isGuest:true
                       },
                     },}
             
             });
            return res
           .status(201)
           .json({ message: "patient was created succefully", creatPatient });
          }
        
        catch(err){

return res.status(400).json({message:err})



        
      
      }
    
        
        
 


        


        
      

  
          
    



          

     
        
       

       

          
        
          
       

      
    
     }
