"use client";
import { usePatients } from "@/hooks/hooks/patients";
import style from "@/components/pcard.module.css"
import { Patient } from "@/types/patients";
import { useState } from "react";
import Modal from "./modal"
import AddPatient from "./addptnt";
import { Props } from "@/types/appointments";


export default function PatientsCard({ search, setSearch }:Props) {


  const [editing, isEditing] = useState<Patient|null>(null);

  const { data: patient, isLoading } = usePatients(search);
  if (isLoading) {
    return <p>LOADING. . . .</p>;
  }

  console.log(usePatients)
  
  



  return (
    <div className={style.patientpage}>
      <ul className={style.patientgrid}>
        {patient?.map((currentpatient: Patient) => (
          <li key={currentpatient.cuid} className={style.celldata}>
            <div className={style.petintro}>
              <div>
                <button
                  onClick={() => isEditing(currentpatient)}
                  className={style.actions}
                >
                  Edit
                </button>
                {editing?.cuid === currentpatient.cuid && (
                  <Modal onClose={() => isEditing(null)}>
                    <AddPatient patient ={editing} />
                  </Modal>
                )}
              </div>
              <h3>{currentpatient.PetName}</h3>
              <p>{currentpatient.breed}</p>
            </div>
            <div className={style.petdet}>
              <p>Species: {currentpatient.species}</p>
              <p>Owner: {currentpatient.owner.name}</p>
              <p> cuid: {currentpatient.cuid}</p>
              <p>Last visted:</p>
              <div className={style.actions}>
                <button>View</button>
                <button>Medical Records</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
