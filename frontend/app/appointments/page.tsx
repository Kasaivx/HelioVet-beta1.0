"use client"
import AppointmentsPage from "@/components/appoint-frame";
import style from "@/app/appointments/appcon.module.css"
import SearchEng from "@/components/searchEng";
import { Plus } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/modal";
export default function Appointment(){
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  
  return (
  <div className={style.frammos}>
    <div className={style.appointframe}>
      <div className={style.words}>
        <h1>Appointmnets</h1>
        <p>Manage your clinic schedule</p>

        <div className={style.apps}>
          <button onClick={() => setOpen(true) }className={style.btn }>Add Appointment</button>
{open &&(<Modal onClose={()=> setOpen(false)}></Modal>)}
        </div>
      </div>
      <div className={style.schengf}>
        <SearchEng search={search} setSearch={setSearch} />
      </div>
      <div className={style.appointconta}>
        <AppointmentsPage search={search} setSearch={setSearch} />
      </div>
    </div>
  </div>
);



}