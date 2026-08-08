import { verfToken } from "../services/jwt.service.js";

export function authMiddleWare(req,res,next) {
   
  const authHeader = 
  req.headers.authorization || "";

  if(!authHeader?.startsWith("Bearer ")){
return res.status(401).json({
message:"Unauthorized"})}

 const token = 
     authHeader.split(" ")[1];

   if (!token){
return res.status(401).json({message:"token not found"})}

  try{
     const payload = 

     verfToken(token);
  
     req.user = payload;
     
     next()

    }catch{
    
     return res.status(401).json({
      
        message:"invalid token"

     });


    }}
