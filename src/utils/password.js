import bcrypt from "bcrypt";

export async function hashPassword(password){
    const hash = await bcrypt.hash(password,10);

    return hash;
}

export async function verifyPassword(password,hash){
    const isMatch = await bcrypt.compare(password,hash);

    return isMatch;
}