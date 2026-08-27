"use client"
import style from './modal.module.css'



export default function Modal({children,onClose}){

    return (
      <div>
        <div className={style.outershell}>
          <button className={style.closebtn} onClick={onClose}></button>
          <div className={style.innershell}>{children}</div>
        </div>
      </div>
    );

}