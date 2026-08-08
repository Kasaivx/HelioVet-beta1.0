import { creatUser, findByEmail } from "../repos/user.repository.js";

import { hashcomp, hashSer } from "./hash.service.js";

import { genrtToken } from "./jwt.service.js";
import { prisma } from "../config/db.js";

export async function register({
  email,
  password,
  phone,
  role,
  name,
}) {
  try {
    const used = await findByEmail(email);
    console.log(email);

    if (used) {
      throw new Error("this email is already used try another one");
    }

    if (!phone) {
      throw new Error("please enter a phone number");
    }

    const hashedpass = await hashSer(password);

    const user = await creatUser({
      email,
      password: hashedpass,
      phone,
      role,
    });

    if (role === "VET") {
  
      await prisma.vet.create({
        data: {
          userId: user.id,
          phone,
        },
      });
    } else if (role === "OWNER") {
      await prisma.owner.create({
        data: {
          userId: user.id,
          phone,
          name,
        },
      });
    }

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
