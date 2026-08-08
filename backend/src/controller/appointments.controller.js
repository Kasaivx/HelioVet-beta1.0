
import {
  creatA,
  deleteA,
  editA,
  getA,
  searchAppoints,
} from "../repos/appointments.repo.js";
import { prisma } from "../config/db.js";


export async function getappointments(req, res) {
  const { search } = req.query;

  try {
    if (search) {
      const results = await searchAppoints(search);

      if (results.length === 0) {
        return res.status(404).json({
          message: "Appointments not found",
        });
      }

      return res.status(200).json({
        message: "Appointments were found",
        results,
      });
    }

    const getappoints = await getA();

    return res.status(200).json({
      message: "Appointments fetched successfully",
      data: getappoints,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}
export async function createAppoinments(req,res) {
   try{

    if (!req.body.patientId) {
      return res.status(400).json({
        message: "patientId is required",
      });
    }

    const patient = await prisma.patient.findUnique({
        where: {
            id: Number(req.body.patientId)

        },
    });

      if (!patient) {
        return res.status(404).json({
          message: "patient not found"
        });
      }

      const vet = await prisma.vet.findUnique({
        where: { userId: req.user.userID },
      });

     const creatappoints = 
     await creatA({
        date:req.body.date,
           reason:req.body.reason,
          status: 'PENDING',
         patientID:patient.id,
         vetID: vet.id
     });
   
      res.status(201).json({message:"appointment was created succefully",data:creatappoints})

   }catch(error){
       
         res.status(400).json({ message: error.message });


   }
}

export async function deletappoinments(req,res) {
      
    const id = Number(req.params.id)
    try{
        const appointmntDel = 
        await deleteA(id)

        res.status(200).json({message:"deleted appoinment succefully",data:appointmntDel})




    }catch(error){

res.status(400).json({message:error.message})}

}

export async function editAppointments(req,res) {
    const id = Number(req.params.id)
    try{
           
        const appointmntupdate = 
        await editA(id,req.body)

          res
            .status(200)
            .json({
              message: "appointment was edited succefully",
              data: appointmntupdate,
            });



    }catch(error){

           res.status(400).json({ message: error.message });

    }
    
}