import {prisma}  from "../config/db.js"


export async function getVetFromUserId(userId) {
  return prisma.vet.findUnique({
    where: { userId },
  });
}
