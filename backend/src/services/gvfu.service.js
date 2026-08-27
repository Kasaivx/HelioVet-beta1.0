import {prisma}  from "../config/db.js"


export async function getClincFromUserId(userId) {
  return prisma.clinic.findUnique({
    where: { userId },
  });
}
