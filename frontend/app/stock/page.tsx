"use client"
import Stock from "@/components/stck-table"
import SearchEng from "@/components/searchEng"
import { useState } from "react"
import style from '@/app/stock/st.module.css'
export default function Inven(){
  const [search, setSearch] = useState("");
  return (
    <div className={style.patientframe}>
      <div className={style.header}>
        <div className={style.pwords}>
          <h1>Inventory</h1>
          <p>Manage medical supplies and medications</p>
        </div>

        <button className={style.btn}>Add an item </button>
      </div>

      <div className={style.se}>
        <SearchEng search={search} setSearch={setSearch} />
      </div>

      <div className={style.pc}>
        <Stock search={search} setSearch={setSearch} />
      </div>
    </div>
  );
}