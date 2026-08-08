"use client"
import { Product } from "@/types/product"
import { useProducts } from "@/hooks/hooks/products"
import { Divide } from "lucide-react"
import style from "./stt.module.css"

export default function Stock() {
    
const{

data,
isLoading
}=useProducts()

if(isLoading){
return <p>LOADING. . . .</p>}
  
   
     console.log(data);
   

return (
  <div>
<table className={style.appointtb}>
        <thead>
          <tr>
            <th className={style.appointthst}>Date</th>
            <th className={style.appointth}>Patient</th>
            <th className={style.appointth}>Owner</th>
            <th className={style.appointth}>Reason</th>
            <th className={style.appointth}>Vet</th>
            <th className={style.appointthest}>status</th>
          </tr>
        </thead>

        <tbody className={style.tbody}>
          {appointments?.map((appointment: Appointment) => (
            <tr key={appointment.id} className={style.appointholder}>
              <td className={style.appointtd}>
                {dateFormatter(appointment.date)}
              </td>
              <td className={style.appointtd}>{appointment.patient.PetName}</td>
              <td className={style.appointtd}>
                {appointment.patient.owner.name}
              </td>
              <td className={style.appointtd}>{appointment.reason}</td>
              <td className={style.appointtd}>
                DR.{appointment.vet.fullName}{" "}
              </td>
              <td className={style.appointtd}>
                <span
                  className={`${style.status} ${statusStyles[appointment.status]}`}
                >
                  {appointment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
</div>)
}
