import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {EdtPatientVars, Patient } from "@/types/patients";
import { Crtpatient } from "@/types/patients";

////get route/////
async function fetchPatients(search: string) {
  if (search) {
    const res = await api.get<{ results: unknown; data: Patient[] }>(
      `/patients?search=${search}`,
    );

    return res.data.data;
  } else {
    const res = await api.get("/patients");
    return res.data.data;
  }
}

export function usePatients(search: string) {
  return useQuery<Patient[]>({
    queryKey: ["patient", search],

    queryFn: () => fetchPatients(search),
  });
}
////get route/////

////post route/////
export async function patientPost(data: Crtpatient) {

      console.log("POSTING TO:", "/patients/vet");
      console.log("DATA:", data);

  const crtPtnt = await api.post<Patient>("/patients/vet", data);

  return crtPtnt.data;
}

export function useAddPtnt() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: patientPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient"] });
    },
  });

  return mutation;
}
////post route/////

////put route/////
export async function patientPatch({ cuid, data }: EdtPatientVars) {
  console.log("🔥 PATCH FUNCTION");
  console.log("EDIT CUID:", cuid);
  console.log("EDIT URL:", `/patients/${cuid}`);
 

  const edtPtnt = await api.patch<Patient>(`/patients/${cuid}`, data);

  return edtPtnt.data;
}

export function useEditPtnt() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: patientPatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient"] });
    },
  });

  return mutation;
}

////put route/////

export async function DelPatients(cuid:number) {
 
    const delted = await api.delete(`/patients/${cuid}`)
    return delted


}
export function useDelPatients() {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DelPatients,
    onSuccess: () =>{
queryClient.invalidateQueries({ queryKey: ["patient"] });
    },

  
  });
} 