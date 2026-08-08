"use client";
import styles from '@/components/dock.module.css'
import Pi from "@/icons/profile"
import Si from "@/icons/stock"
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Pai from '@/icons/patients';
import Ai from '@/icons/ai';
import Di from '@/icons/di';

function Navdock() {
const router = useRouter();
const pathname = usePathname();
  const dockItems =[
  {id:"dashboard",label:"Dashboard",icon:<Di/>,path:"/dashboard"},
  {id:"appointments",label:"Appointments",icon:<Ai/>,path:"/appointments"},
  {id:"patients",label:"Patients",icon:<Pai/>,path:"/patients"},
  {id:"stock",label:"Stock",icon:<Si/>,path:"/stock"},
  {id:"profile",label:"Profile",icon:<Pi/>,path:"/profile"},
]
  return (

    <div className= {styles.dock}>
    
      {dockItems.map((btn) => {
        const isActive = pathname === btn.path;
          return (
            <motion.button
              className={styles.butt}
              key={btn.id}
              onClick={() => router.push(btn.path)}
            >
              <div
                className={`${styles.icn} ${isActive ? styles.icnActive : ""}`}
              >
                {btn.icon}
                {btn.label}
              </div>

              {isActive && (
                <motion.div
                  layoutId="dock-pill"
                  className={styles.pill}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
    </div>
  )}

export default Navdock;
