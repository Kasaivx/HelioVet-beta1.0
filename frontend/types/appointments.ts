import { Dispatch, SetStateAction } from "react";

interface Owner {
  name: string;
}
interface Patient {
  PetName: string;
  age: number;
  species: string;
  breed: string;
  owner: Owner;
}

interface Vet {
  fullName: string;
}

export interface Appointment {
  cuid: string;
  status: AppointmentStatus;
  reason: string;
  date: string;
  patient: Patient;
  vet: Vet;
}


export interface CrtAppointment {
  status: AppointmentStatus;
  reason: string;
  date: string;
  patient: Patient;
  vet: Vet;
}


export interface EdtAppointment {
 data:CrtAppointment
 cuid:string
}





export type AppointmentStatus =
 |"PENDING"
|"CONFIRMED"
|"INPROGRESS"
|"COMPLETED"
|"CANCELLED";

export interface Props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

