import { prisma } from "../config/db.js";

export async function addPrdct(data) {
  return await prisma.product.create({ data });
}

export async function delPrdct(id) {
  return await prisma.product.delete({ where: { id } });
}

export async function editPrdct(id,data) {
  return await prisma.product.update({
    
    where:{id},
    data, })}

    export async function getPrduct() {
      return await prisma.product.findMany(
        {
        
          include:{
           
          log:true
            
          },
          where:{isActive: true}
        }
      )
      
    }

    export async function searchPrdct(search) {
      return await prisma.product.findMany({
        include: {
          log: true,
        },
        where: {
          isActive: true,
          name: { contains:search, mode: "insensitive"  },
        },
      });
      
    }
     



