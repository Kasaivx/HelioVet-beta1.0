import { prisma } from "../config/db.js";
import { creatMedRec, deleteMedRec , getMedRec,upMedRec} from "../repos/medical.repo.js";



export async function creatMedRecCntrlr(req,res) {


const test = await prisma.appointment.findUnique({
  where: { id: 2 },
});

console.log("FIND UNIQUE RESULT:", test);

console.log(" LOADED MEDICAL CONTROLLER FILE");
console.log("FILE PATH:", import.meta.url);

    const appoint1STCheck = await prisma.appointment.findFirst();

    console.log("FIRST APPOINTMENT:", appoint1STCheck);
     
    const count = await prisma.appointment.count();
    console.log("APPOINTMENTS COUNT:", count);
    try{
        console.log("appointmentID:", req.body.appointmentID);
        console.log("parsed:", Number(req.body.appointmentID));

        const medRecReq = req.body
        const appointID = Number(medRecReq.appointmentID)

    const appointCheck = await prisma.appointment.findUnique({

        where :{
            id:appointID
        }
    })
    if (!appointCheck){
             console.log("CHECK RESULT:", appointCheck);
        return res.status(404).json({message:"appoinment not found"})

    }




    const existing = await prisma.medicalRecord.findFirst({
      where: {
        appointmentID: appointID,
      },
    });

    if (existing) {
      return res.status(400).json({
        message: "record already exists",
      });
    }

    const createdMedRec = await creatMedRec({
      appointmentID: appointID,
      diagnosis: medRecReq.diagnosis,
      treatment: medRecReq.treatment,
      notes: medRecReq.notes,
      instructions: medRecReq.instructions,
    });


    res.status(201).json({message:"record was created succefully",data:createdMedRec})

    }catch(error){

  
 res.status(400).json({ message: error.message });


    }
    
}


export async function getMedicalRec(req,res) {
    try{
          
        const getMR= await getMedRec();

             res.status(200).json({message:'recordes was fetched succefully',data:getMR})
       


    }catch(error){

         res.status(400).json({ message: error.message });
    }
    
}




export async function editMedRec(req,res){
  
    const id = Number(req.params.id)
    const data = req.body
    try{
                
        const editmedrec = await upMedRec(id,data);

        res.status(200).json({message:"record was edited succefully",data:editmedrec})



    }catch(error){


 res.status(400).json({ message: error.message });
    }


}

export async function deleteMrec(req,res) {
    

 const id =Number(req.params.id)
    try{
                
        const deletemedrec = await deleteMedRec(id);

        res.status(200).json({message:"record was deleted succefully",data:deletemedrec})



    }catch(error){


 res.status(400).json({ message: error.message });
    }




}
