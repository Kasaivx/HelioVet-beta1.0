import {prisma} from "../config/db.js"

export async function creatMedRec(data) {
    return await prisma.medicalRecord.create({data})
}

export async function deleteMedRec(id) {
    return await prisma.medicalRecord.delete({
      where: { id },
    });
}



export async function getMedRec() {
    
    return await prisma.medicalRecord.findMany()
}

export async function upMedRec(id,data) {
       return await prisma.medicalRecord.update({
        where: {id},
        
        data
       }
       )


    
}