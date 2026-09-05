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



  return (
    <div className={style.patientpage}>
      <ul className={style.patientgrid}>
        {patient?.map((patient: Patient) => (
          <li key={patient.id} className={style.celldata}>
            <div className={style.petintro}>
              <div>
                <button
                  onClick={() => isEditing(patient)}
                  className={style.actions}
                >
                  Edit
                </button>
                {editing?.id === patient.id && (
                  <Modal onClose={() => isEditing(null)}>
                    <AddPatient patient ={editing} />
                  </Modal>
                )}
              </div>
              <h3>{patient.PetName}</h3>
              <p>{patient.breed}</p>
            </div>
            <div className={style.petdet}>
              <p>Species: {patient.species}</p>
              <p>Owner: {patient.owner.name}</p>
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
