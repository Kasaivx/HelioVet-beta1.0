import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Patient } from "@/types/patients";


async function fetchPatients(search:string) {
  console.log("fetchPatients called", search);
  if (search){
     const res = await api.get<{results:any;data:Patient[]}>(`/patient?search=${search}`);
     
     return res.data.data
}else{
  const res = await api.get("/patient");
  return res.data.data;
}}

export function usePatients(search: string) {
  return useQuery<Patient[]>({
   
    queryKey: ["patient",search],

    queryFn: () => fetchPatients(search),
      
  });

}
