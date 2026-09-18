import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Appointment, CrtAppointment , EdtAppointment} from "@/types/appointments";

async function fetchAppointments(search:string) {
  if (search){
   const serchres = await api.get<{
     results:Appointment[] ;
     
     data:Appointment[]
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

/////////////////post/////////

async function postAppointments(data:CrtAppointment) {

  const crtAppoinst = await api.post<Appointment>("/vetappointments",data)
  return crtAppoinst.data;
}
export function useAddAppiont() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postAppointments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });

  return mutation;
}

//////patch//////////

async function patchAppointments({cuid, data} : EdtAppointment){

  const edtappoints = await api.patch <Appointment>(`/vetappointments/${cuid}`, data)

  return edtappoints.data
}

export function useEditAppointment(){
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn:patchAppointments,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['appointments']});
    },
  })
  return mutation
}

