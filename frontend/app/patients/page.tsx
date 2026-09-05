'use client'
import PatientsCard from "@/components/pcards"; 
import SearchEng from "@/components/searchEng";
import { useState } from "react"; 
import style from '@/app/patients/ptt.module.css'
import Modal from "@/components/modal";
import AddPatient from "@/components/addptnt";


export default function PatientPage(){
  const [isOpen,isSetOpen] = useState(false)
  const [Search,setSearch] = useState('');
  return (
    <div className={style.patientframe}>
      <div className={style.header}>
        <div className={style.pwords}>
          <h1>Patients List</h1>
          <p>View and manage patient information</p>
        </div>

        <button onClick={() => isSetOpen(true)} className={style.btn}>
          Add a Patient
        </button>
        {isOpen && (
          <Modal onClose={() => isSetOpen(false)}>
            <AddPatient />
          </Modal>
        )}
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

//