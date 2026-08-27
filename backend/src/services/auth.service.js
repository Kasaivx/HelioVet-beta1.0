import { findByEmail, findByUsrName } from "../repos/user.repository.js";

import { hashcomp, hashSer } from "./hash.service.js";

import { genrtToken } from "./jwt.service.js";
import { prisma } from "../config/db.js";
import { genNanoID} from "./nanoid.service.js"
export async function register({
  email,
  password,
  phone,
  role,
  username,
  name,
  clinic,
  vet
  },
) {
  try {
    const used = await findByEmail(email);

    if (used) {
      throw new Error("this email is already used try another one");
    }

const userNameUsed = await findByUsrName(username)

    if(userNameUsed){
      throw new Error("this username is unavailable pick another one ")
    }

    if (!phone) {
      throw new Error("please enter a phone number");
    }
    if (role === "CLINIC") {
    if (!clinic?.licenseUrl) {
      throw new Error("please enter your medical license");
    }
    if (!clinic?.idCardUrl) {
      throw new Error("please enter your ID card");
    }
  }
    const hashedpass = await hashSer(password);
    const user = await prisma.$transaction(async (tx) => {
      const acc = await tx.user.create({ data :{
        email,
        password: hashedpass,
        phone,
        username,
        role,}
      });


      if (role === "CLINIC") {


 
        const clnccrtn = await tx.clinic.create({
          data: {
            userId: acc.id,
            clinicname: clinic.clinicname,
            licenseUrl: clinic.licenseUrl,
            idCardUrl: clinic.idCardUrl,
            nid: genNanoID("C"),
          },
        });
        console.log("nano", clnccrtn.nid);
        const vetcrtn = await tx.vet.create({
          data: {
            clinicId: clnccrtn.id,
            fullName: clinic.vet.fullName,
          },
        });
      } else if (role === "OWNER") {
        await tx.owner.create({
          data: {
            userId: acc.id,
            phone,
            name,
            isGuest:false,
            nid: genNanoID("O"),
          },
        });
      }
      return acc
    });

    const token = genrtToken(user);

    const safeUser = {
      id: user.id,
      email: user.email,
      role: user.role,
      phone: user.phone,
    };

    return {
      user: safeUser,
      token,
    };
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("email already used");
    }
    throw err;
  }
}

export async function login({ email, password }) {
  if (!password) {
    throw new Error("password is required");
  }
  const loggedIn = await findByEmail(email);

  if (!loggedIn) {
    throw new Error(
      "this account doesnt exist if you dont have an account please resgister",
    );
  }

  const hashCheck = await hashcomp(password, loggedIn.password);

  if (!hashCheck) {
    throw new Error("incorrect password");
  }

  const token = genrtToken(loggedIn);
  const safeUser = {
    id: loggedIn.id,
    email: loggedIn.email,
    role: loggedIn.role,
  };
  return {
    user: safeUser,
    token,
  };
}
