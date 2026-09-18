import { prisma } from "../config/db.js";

export async function getP() {
  return await prisma.patient.findMany({
    include: {
      owner: {
        select: {
          name: true,
          id:false,
          isGuest:true,
          phone:true,
          address:true
          
        },
      },
    },
  });
}

export async function fetchPatientProfile(cuid){
        console.log("PATIENT REPOSITORY LOADED");

 return await prisma.patient.findUnique({
  where:{

cuid

  }
 })

}

export async function searchpatients(search) {
  return await prisma.patient.findMany({
    include: {
      owner: {
        select: {
          name: true,
          id:false,
        },
      },
    },
    where: { PetName: { contains: search, mode: "insensitive" } },
  });
}

export async function creatP(data) {
  return await prisma.patient.create({
    data,
  });
}

export async function updateP(cuid, data) {
  return await prisma.patient.update({
    where: { cuid },
    data,
  });
}

export async function deleteP(cuid) {
  return await prisma.patient.delete({
    where: { cuid },
  });
}


export async function findPatientByCUID(cuid){
return await prisma.patient.findUnique({
  where:{cuid},
  include:{
    owner:true
  }
})
}