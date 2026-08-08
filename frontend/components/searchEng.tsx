
"use client";

import styles from "@/components/srcheng.module.css"
import { Props } from "@/types/appointments";
import {Search} from "lucide-react";

export default function SearchEng({search,setSearch}:Readonly<Props>){




    return (
      <div className={styles.srchfrm}>
        <Search className={styles.srchicn} />

        <input
          className={styles.srchbr}
         
          type="search"
          name="search"
          value={search}
          onChange={s => setSearch (s.target.value)}
          id="srcheng"
          placeholder="Search appointments"
        />
      </div>
    );

}