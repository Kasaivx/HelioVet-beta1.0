import { useMutation} from "@tanstack/react-query";
import { api } from "@/lib/api";


async function loginIn(email:string,password:string) {
  const res = await api.post("/auth/login",{email,password});

  return res.data;
}

export function useLogin() {
  return useMutation({
    mutationFn:({email,password}:{email:string,password:string})=>loginIn(email,password)}
  )}


