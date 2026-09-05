'use client'

import { useAddPtnt, useEditPtnt } from "@/hooks/hooks/patients";
import style from "./adptnt.module.css"
import { useState } from "react";
import {Prorps} from '../types/patients'
export default function AddPatient({patient}:Prorps){
    const [petName,setPetName] = useState(patient?.PetName??"")
      const [breed, setBreed] = useState(patient?.breed??"");
        const [species, setSpecies] = useState(patient?.species??"");
          const [age, setAge] = useState("");
           const [isGuest,setIsGuest] =useState(false)
            const [ownerNid, setOwnerNid] = useState("");
             const [ownerName, setOwnerName] = useState("");
              const [ownerPhone, setOwnerPhone] = useState("");
               const [ownerAddress, setOwnerAddress] = useState("");
               const AddPatient = useAddPtnt();
const editPatient = useEditPtnt()

              
              
                function edit(e: React.FormEvent<HTMLFormElement>){
                  e.preventDefault();
                  console.log('edited')
                    console.log({
                      petName,
                      breed,
                      species,
                      age,
                    });
                       if (!patient) return;
editPatient.mutate({
  id: patient.id,
  data: {
    petName,
    breed,
    species,
    age: Number(age),

    owner: isGuest
      ? {
          isGuest: true,
          name: ownerName,
          phone: ownerPhone,
          address: ownerAddress,
        }
      : {
          isGuest: false,
          nid: ownerNid,
        },
  },
});
               
                }


function submition(i: React.FormEvent<HTMLFormElement>) {
  i.preventDefault();

  console.log("SUBMITTED");

  console.log({
    petName,
    breed,
    species,
    age,
  });

  AddPatient.mutate({
    petName,
    breed,
    species,
    age: Number(age),
    owner:isGuest?{
isGuest :true,
name: ownerName,
phone: ownerPhone,
address: ownerAddress,
    }:{
      isGuest: false,
      nid: ownerNid
    }
  });
}
  return (
    <div>
      <div>
        <form onSubmit={submition}>
          <label htmlFor="petName"> Name</label>

          <input
            id="petName"
            value={petName}
            onChange={(i) => setPetName(i.target.value)}
            placeholder="Patient Name"
            className={style.name}
            type="text"
          />
          <label htmlFor="species">Species</label>

          <input
            id="species"
            value={species}
            onChange={(i) => setSpecies(i.target.value)}
            placeholder="Patient Species"
            className={style.name}
            type="text"
          />

          <label htmlFor="breed">Breed</label>

          <input
            id="breed"
            value={breed}
            onChange={(i) => setBreed(i.target.value)}
            placeholder="Patient Breed"
            className={style.name}
            type="text"
          />

          <label htmlFor="age"> Age</label>

          <input
            id="age"
            value={age}
            onChange={(i) => setAge(i.target.value)}
            placeholder="Patient Age"
            className={style.name}
            type="number"
          />

          <label>
            <input
              type="checkbox"
              checked={isGuest}
              onChange={(i) => setIsGuest(i.target.checked)}
              className={style.name}
            />
            Guest Owner
          </label>

          {!isGuest ? (
            <div>
              <label htmlFor="ownerNid"></label>

              <input
                id="ownerNid"
                type="text"
                value={ownerNid}
                onChange={(i) => setOwnerNid(i.target.value)}
                placeholder="Owner ID"
                className={style.name}
              />
            </div>
          ) : (
            <div>
              <label htmlFor="ownerName"></label>

              <input
                type="text"
                id="ownerName"
                value={ownerName}
                onChange={(i) => setOwnerName(i.target.value)}
                placeholder="Owner name"
                className={style.name}
              />
              <label htmlFor="ownerPhone"></label>

              <input
                type="text"
                id="ownerPhone"
                value={ownerPhone}
                onChange={(i) => setOwnerPhone(i.target.value)}
                placeholder="Owner phone"
                className={style.name}
              />
              <label htmlFor="ownerAddress"></label>

              <input
                id="ownerAddress"
                type="text"
                value={ownerAddress}
                onChange={(i) => setOwnerAddress(i.target.value)}
                placeholder="Owner address"
                className={style.name}
              />
            </div>
          )}
          <button type="submit">
            {patient ? "Edit Patient" : "Add Patient"}Add Patient
          </button>
        </form>
      </div>
    </div>
  );


                }
              