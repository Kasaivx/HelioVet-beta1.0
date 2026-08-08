import {prisma} from "../config/db.js";

         
export async function searchAppoints(search) 
{
  return await prisma.appointment.findMany({
    include: {
      patient: {
        select: {
          PetName: true,
          owner: {
            select: {
              name: true,
            },
          },
        },
      },
      vet: {
        select: {
          fullName: true,
        },
      },
    },
    where: { patient: { PetName: { contains: search, mode: "insensitive" } } },
  });}
  
export async function getA(data) {
    return await prisma.appointment.findMany({
include:{
           patient:{
            select:{
              PetName:true,
              owner:{
                select:{
                  name:true,
                }
              },
            },
        
            },
            vet:{
            select:{
              fullName:true,}
                
            }
          }
      
          }
        )}


export async function creatA(data) {
  return await prisma.appointment.create({
    data: {
      date: data.date,
      reason: data.reason,
      status: "PENDING",

      patient: {
        connect: { id: data.patientID },
      },

      vet: {
        connect: { id: data.vetID },
      },
    },
  });
}

export async function editA(id,data) {
    return await prisma.appointment.update({where:

        {id},
        data
    })
    
};

export async function deleteA(id) {
    return await prisma.appointment.delete({where:{id}})
}