import { useQuery } from "@tanstack/react-query";
import {api} from"@/lib/api";

async function fetchProducts() {

const res = await api.get("/stock")

return res.data;

}


export function useProducts(){


    return useQuery({

   queryKey:['products'],

    queryFn:fetchProducts

    })
}