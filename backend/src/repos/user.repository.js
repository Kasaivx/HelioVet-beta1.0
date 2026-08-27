import { prisma } from "../config/db.js";

export async function findByEmail(email) {
  return await prisma.user.findUnique({ where: { email } })
};

export async function findByUsrName(username) {
  return await prisma.user.findUnique({ where: { username } })
};


export async function findByID(id) {
  return await prisma.user.findUnique({ where: { id } });
}


export async function findOwnerByNID(nid) {
  const owner = await prisma.owner.findUnique({
    where: {
      nid,
    },
  });

  console.log("SEARCH NID:", JSON.stringify(nid));
  console.log("FOUND OWNER:", owner);

  return owner;
}
export async function fetchProfile(id) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        email: true,
        phone: true,

        clinic: {
          select: {
            clinicname: true,
            status: true,
            location: {
              select:{
              latitude: true,
              longitude: true,}
            },
            workingschedule: {
              select: {
                WorkingDays: true,
                StartTime: true,
                EndTime: true,
              },
            },
          },
        },
      },
    });};
