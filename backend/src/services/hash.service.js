import bcrypt from "bcrypt";

export async function hashSer(Password) {
return await bcrypt.hash(Password,10)
};


export async function hashcomp(Password,hash) {
    return await bcrypt.compare(Password,hash);
}


