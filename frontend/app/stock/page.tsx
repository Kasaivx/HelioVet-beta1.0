"use client"
import { Product } from "@/types/product"
import { useProducts } from "@/hooks/hooks/products"


export default function Stock() {
    
const{

data,
isLoading
}=useProducts()

if(isLoading){
return <p>LOADING. . . .</p>}
  
   
     console.log(data);
   

return (
  <main>


    {data?.map((product: Product) => (
      <div key={product.id}>
        <p>{product.name}</p>
        <p>{product.quantity}</p>
      </div>
    ))}
  </main>
);}
