import jwt from "jsonwebtoken"



export function genrtToken(user){
return jwt.sign({

    userID:user.id,
    role:user.role
},
process.env.JWT_KEY,
{
    expiresIn:"90d"
}

)
}

export function verfToken(token){
return jwt.verify(token,process.env.JWT_KEY)

};