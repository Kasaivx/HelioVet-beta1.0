"use client"
import type { Status, Stock,} from "@/types/stock"
import { useProducts } from "@/hooks/hooks/products"
import style from "./stt.module.css"
import { Props } from "@/types/appointments";
function dateFormatter(isoString: string) {
  if (!isoString) {
    return "no date";
  }

  const isoDate = new Date(isoString);
  if (Number.isNaN(isoDate.getTime())) return "invalid date";

  let date = isoDate.toLocaleString("en-DZ", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/algiers",
  });
  date = date.replace(".", "");
  return date;
}
export default function Stock({search ,setSearch}:Props) {
    
const{

data : stock,
isLoading
}=useProducts(search)

console.log(stock);

if(isLoading){
return <p>LOADING. . . .</p>}
  
 const stockStyles: Record<Status, string> = {

  OUT_OF_STOCK:style.outfstk,
CRITICAL_STOCK:style.crtcl,
LOW_STOCK:style.lowstk,
IN_STOCK:style.instk

 };
    
return (
  <div>
    <table className={style.appointtb}>
      <thead>
        <tr>
          <th className={style.appointthst}>Name</th>
          <th className={style.appointth}>Quantity</th>
          <th className={style.appointth}>QR</th>
          <th className={style.appointth}>Expairy Date</th>
          <th className={style.appointthest}>status</th>
        </tr>
      </thead>

      <tbody className={style.tbody}>
        {stock?.map((stock: Stock) => (
          <tr key={stock.id} className={style.appointholder}>
            <td className={style.appointtd}>{stock.name}</td>
            <td className={style.appointtd}>{stock.quantity}</td>
            <td className={style.appointtd}>{stock.qr}</td>
            <td className={style.appointtd}>
              {" "}
              {dateFormatter(stock.expiryDate)}
            </td>
            <td className={style.appointtd}>
              <span
                className={`${style.status} ${stockStyles[stock.stockStatus]}`}
              >
                {stock.stockStatus}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}
