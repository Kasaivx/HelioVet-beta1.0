import { useQuery } from "@tanstack/react-query";
import {api} from"@/lib/api";
import { Stock } from "@/types/stock";

async function fetchProducts( search:string) {
if(search){
const res = await api.get<{results:unknown;data:Stock[]}>(`/stock?search=${search}`);

return res.data.data

} else{
const res = await api.get("/stock")

return res.data.data;

}}


export function useProducts(search: string){


    return useQuery<Stock[]>({

   queryKey:['products',search],

    queryFn: () => fetchProducts(search)

    })
}
