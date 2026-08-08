'use client'
import PatientsCard from "@/components/pcards"; 
import SearchEng from "@/components/searchEng";
import { useState } from "react"; 
import style from '@/app/patients/ptt.module.css'

export default function PatientPage(){
  const [Search,setSearch] = useState('');
  return(
<div className={style.patientframe}>
  <div className={style.header}>
    <div className={style.pwords}>
      <h1>Patients List</h1>
      <p>View and manage patient information</p>
    </div>

    <button className={style.btn}>
      Add a Patient
    </button>
  </div>

  <div className={style.se}>
    <SearchEng search={Search} setSearch={setSearch} />
  </div>

  <div className={style.pc}>
    <PatientsCard search={Search} setSearch={setSearch} />
  </div>
</div>
);


}