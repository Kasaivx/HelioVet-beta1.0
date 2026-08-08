
 export function roleMiddleWare(role){
     return function (req, res, next){
       if(!req.user){
       
        return res.status(401).json({message:"hufasilefwuijERRoisxjhciewhnERR G E T O U T erhfuwih Y O U R E oidjwioejdo N O T okfpwoef A L L O W E D kdnfvoid H E R E"})

     }

      const userRole = req.user.role


         if(userRole !== role){
            
            return res.status(403).json({message:"youre not allowed here"})

         }
         
              next()

      }
   }
