
import { prisma } from "../config/db.js";
import { addPrdct,getPrduct} from "../repos/stock.repo.js";
import { getVetFromUserId } from "../services/gvfu.service.js";



export async function addProduct(req,res){
    try{
    const prdctData = req.body

    if (!req.user?.userID) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

 const usr = req.user.userID

const vet = await getVetFromUserId(usr)
if(!vet){
       return res.status(404).json({message:"vet not found"})
}


    const addedPrdct = await addPrdct(prdctData);

    const productID = (addedPrdct.id)

await prisma.invLog.create({data:{
   
    prdctID: productID,
    vetID: vet.id,
    action:"ADD",
    method:"MANUAL",
}})

res.status(201).json({message:"product was added succefully",data:addedPrdct})

    
    }catch(error){

        res.status(400).json({message:error.message})

    }
}


export async function deleteProduct(req,res){

    const id = Number(req.params.id)
   const usr = Number(req.user.userID);

    const vet = await getVetFromUserId(usr)

    if (!vet) {
      return res.status(404).json({ message: "Vet not found" });
    }

    try{
        const prdctdel = await prisma.product.update({
            where:{id},
            data:{isActive: false}
        })

        await prisma.invLog.create({
          data: {
            prdctID: id,
            vetID: vet.id,
            action: "USE", 
            method: "MANUAL",
            changedAmount: "0",
          },
        });

res.status(200).json({message:"product was deacivated succefully",prdctdel})


    }catch(error){


        res.status(400).json({ message: error.message });


    }
}

export async function editProduct(req,res){
     const {action} = req.body

     const amount = Number(req.body.amount)


if (Number.isNaN(amount)) {
  return res.status(400).json({
    message: "amount must be a number",
  });
}

     const productID = Number(req.params.id)


     const usr = Number(req.user.userID)

     const vet = await getVetFromUserId(usr)
     
      if (!vet) {
        return res.status(404).json({
          message: "vet not found",
        });
      }

      const vetId = vet.id;



     if (Number.isNaN(productID)) {
       return res.status(400).json({
         message: "invalid product id",
       });
     }

try{

const product = await prisma.product.findUnique({where:
    {id: productID}
})

if (!product){
return res.status(404).json({message:"product doesnt not exist"})

}


if (!["ADD", "USE"].includes(action)) {
  return res.status(400).json({ message: "Invalid action" });
}


let change = 0;

if (action === "ADD") change = amount;
if (action === "USE") change = -amount;

if (product.quantity + change < 0) {
  return res.status(400).json({ message: "Not enough stock" });
}

const newQuantity = product.quantity + change

console.log({
  old: product.quantity,
  change,
  newQuantity,
});

const updated = await prisma.product.update({
    where:{id: productID},
    data : {quantity: newQuantity

    }

})

await prisma.invLog.create({
  data: {
    prdctID: productID,
    vetID: vetId,
    action,
    method:"MANUAL",
    changedAmount: String(amount),

  },
});

res.status(200).json({message:"product detail were edited succefully",updated})


}catch(error){

 res.status(400).json({ message: error.message });

}


}



export async function getProduct(req,res) {

    const getPrudctFunc = await getPrduct();
try{
    res.status(200).json(getPrudctFunc)
}catch(error){


    res.status(400).json({message:error.message})



}


}



