"use client";

import { useAddPtnt, useEditPtnt } from "@/hooks/hooks/patients";
import style from "./adptnt.module.css";
import { useState } from "react";
import { Prorps } from "../types/patients";

export default function AddPatient({ patient }: Prorps) {
  const addPatient = useAddPtnt();
  const editPatient = useEditPtnt();

  const [PetName, setPetName] = useState(patient?.PetName ?? "");
  const [breed, setBreed] = useState(patient?.breed ?? "");
  const [species, setSpecies] = useState(patient?.species ?? "");
  const [age, setAge] = useState(patient?.age?.toString() ?? "");

  const [isGuest, setIsGuest] = useState(  patient?.owner?.isGuest ??false);
  const [ownerNid, setOwnerNid] = useState(patient?.owner.nid ?? "");
  const [ownerName, setOwnerName] = useState(patient?.owner.name??"")
  const [ownerPhone, setOwnerPhone] = useState(patient?.owner.phone??"");
  const [ownerAddress, setOwnerAddress] = useState("");

  function edit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!patient) return;

    console.log("EDITED");

    editPatient.mutate({
      cuid: patient.cuid,
      data: {
        PetName,
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

  function submition(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("SUBMITTED");

    addPatient.mutate({
      PetName,
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
    });
  }

  return (
    <div>
      <div>
        
        <form  onSubmit={(e) => {
    console.log("🔥 FORM SUBMITTED");
    console.log("PATIENT INSIDE FORM:", patient);
    
    if (patient) {
      console.log("➡️ EDIT BRANCH");
      edit(e);
    } else {
      console.log("➡️ ADD BRANCH");
      submition(e);
    }
  }}>
          <label htmlFor="petName">Name</label>

          <input
            id="petName"
            value={PetName}
            onChange={(e) => setPetName(e.target.value)}
            placeholder="Patient Name"
            className={style.name}
            type="text"
          />

          <label htmlFor="species">Species</label>

          <input
            id="species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            placeholder="Patient Species"
            className={style.name}
            type="text"
          />

          <label htmlFor="breed">Breed</label>

          <input
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            placeholder="Patient Breed"
            className={style.name}
            type="text"
          />

          <label htmlFor="age">Age</label>

          <input
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Patient Age"
            className={style.name}
            type="number"
          />

 <label>
            <input
              type="checkbox"
              checked={isGuest}
              onChange={(e) => setIsGuest(e.target.checked)}
              className={style.name}
            />
            Guest Owner
          </label>

          {!isGuest ? (
            <div>
              <label htmlFor="ownerNid">Owner ID</label>

              <input
                id="ownerNid"
                type="text"
                value={ownerNid}
                onChange={(e) => setOwnerNid(e.target.value)}
                placeholder="Owner ID"
                className={style.name}
              />
            </div>
          ) : (
            <div>
              <label htmlFor="ownerName">Owner Name</label>

              <input
                type="text"
                id="ownerName"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Owner name"
                className={style.name}
              />

              <label htmlFor="ownerPhone">Owner Phone</label>

              <input
                type="text"
                id="ownerPhone"
                value={ownerPhone}
                onChange={(e) => setOwnerPhone(e.target.value)}
                placeholder="Owner phone"
                className={style.name}
              />

              <label htmlFor="ownerAddress">Owner Address</label>

              <input
                id="ownerAddress"
                type="text"
                value={ownerAddress}
                onChange={(e) => setOwnerAddress(e.target.value)}
                placeholder="Owner address"
                className={style.name}
              />
            </div>
          )}

          <button type="submit">
            {patient ? "Edit Patient" : "Add Patient"}
          </button>
        </form>
      </div>
    </div>
  );
}

