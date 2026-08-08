import { prisma } from "../config/db.js";

export async function findByEmail(email) {
  return await prisma.user.findUnique({ where: { email } })
};

export async function findByID(id) {
  return await prisma.user.findUnique({ where: { id } });
}

export async function creatUser(data) {
  return await prisma.user.create({ data });
}