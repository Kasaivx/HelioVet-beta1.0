import { fetchProfile } from "../repos/user.repository.js";


export async function getProfile(req,res) {
    try{
       
        const id = Number(req.user.userID)
    const profile = await fetchProfile(id);

console.log(profile)

    res.status(200).json({message:'profile was fetched succfully',profile})
    }catch (err){

res.status(400).json({message:err.message});



    }


}