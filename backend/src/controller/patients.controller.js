import {getP,deleteP,updateP,creatP, searchpatients, fetchPatientProfile,findPatientByCUID} from "../repos/patient.repository.js"
import {prisma} from "../config/db.js"
import { findOwnerByNID } from "../repos/user.repository.js";
import { genNanoID } from "../services/nanoid.service.js";
import e from "cors";
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

export async function patientProfile(req,res){
         const cuid = req.params.cuid
    console.log( "pcuid", cuid)
    try{
              console.log("fetchPatientProfile:", fetchPatientProfile);

     const profile = await fetchPatientProfile(cuid)
    
    
      console.log('fpp was hit') 

    console.log('it worked ig',profile)
if (!profile){

 return res.status(400).json({message:'patient was not found'})

} else
      
  return res.status(200).json({message:'profile was fetched succfully',profile})

}catch(err){

  return res.status(500).json ({message:err.message})
  console.error("patientProfile error:", err);
}
}

 export async function deletePatients(req,res) {
     const cuid = req.params.cuid;
    
    try{
    const patientDel = await deleteP(cuid)
    
    res.status(200).json({message:"patient was deleted succfully",
      data:patientDel
    });
     }
     catch(error){

 res.status(400).json({message:error.message
 })

    }
 }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function editPaitent(req,res) {
    const cuid = req.params.cuid
    const patientdata = req.body
    console.log("pd",patientdata)
    const ownerdata =patientdata.owner
    const isGuest =ownerdata.isGuest
    console.log(isGuest)
  const NID =  ownerdata.nid
  console.log(NID)

    try{

     const findpatient = await findPatientByCUID(cuid)
     console.log(findpatient)


if (findpatient.PetName === patientdata.PetName && findpatient.age === patientdata.age && findpatient.breed === patientdata.breed && findpatient.species === patientdata.species
){ return res.status(400).json({message:'the info are the same pls change the info'})}

console.log('p data checl done')
       const patientedit = await prisma.$transaction(async(tx)=>{
      const patient = await tx.patient.update({where:{cuid
      },
      data:{
      PetName: patientdata.PetName,
    breed: patientdata.breed,
    species: patientdata.species,
    age: patientdata.age
      }},
    
    
      )

console.log('done', patient)

if (findpatient.owner.isGuest === true && isGuest === true){
  
console.log('its donne probbly')

  if(findpatient.owner.name === ownerdata.name &&  findpatient.owner.phone === ownerdata.phone && findpatient.owner.address === ownerdata.address){
    return res.status(400).json({message:'the info are the same g pls change the info'})}
  }else{
  const guest = await tx.owner.update({where:{patients :{
    cuid
  }

   } })
  console.log('done',guest)}

if (NID)
{
  
const nidLink = await 


tx.patient.update(
{where:{cuid},
data:{owner:{
   connect: { nid: NID},
}}
  }

)

return patient

}


},
       )
       res.status(200).json({ message: "patient was edited succefully",
         data: patientedit })
}catch (error){
          
       console.error(error.stack)
        return res.status(400).json({message:error.message})
          


    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
              data:{  PetName: patientData.PetName,
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
    