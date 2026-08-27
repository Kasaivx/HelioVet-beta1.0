import { prisma } from "../config/db.js";

export async function getP() {
  return await prisma.patient.findMany({
    include: {
      owner: {
        select: {
          name: true,
        },
      },
    },
  });
}

export async function searchpatients(search) {
  return await prisma.patient.findMany({
    include: {
      owner: {
        select: {
          name: true,
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

export async function updateP(id, data) {
  return await prisma.patient.update({
    where: { id },
    data,
  });
}

export async function deleteP(id) {
  return await prisma.patient.delete({
    where: { id },
  });
}
