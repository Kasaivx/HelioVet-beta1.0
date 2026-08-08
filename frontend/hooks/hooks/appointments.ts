import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Appointment } from "@/types/appointments";

async function fetchAppointments(search:string) {
  if (search){
   const serchres = await api.get<{
     results: any;data:Appointment[]
}>(`/vetappointments?search=${search}`)
   return serchres.data.results;

  }else{
  const res = await api.get<{data:Appointment[]}>("/vetappointments");
  
  return res.data.data;}
  }

export function useAppointments(search:string) {
  return useQuery<Appointment[]>({
    queryKey: ["appointments",search],

    queryFn: ()=> fetchAppointments(search),
  });
}

