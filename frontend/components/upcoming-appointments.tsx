"use client";

import { useAppointments } from "@/hooks/hooks/appointments";
import { Clock, MapPin } from "lucide-react";

interface Appointment {
  id: string;
  time: string;
  patient: string;
  owner: string;
}
