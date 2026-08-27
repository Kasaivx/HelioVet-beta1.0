"use client";
import { usePatients } from "@/hooks/hooks/patients";
import style from "@/components/pcard.module.css"
import { Patient } from "@/types/patients";
export default function PatientsCard({ search, setSearch }:unknown) {
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
