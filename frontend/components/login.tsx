"use client";
import styles from'./login.module.css'
import Image from "next/image";
import { useLogin } from '@/hooks/hooks/log in';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function Loginpage() {
  

const router = useRouter()

  const [email,setEmail] = useState("")
const[password,setPassword] = useState("")

  const loginMutation = useLogin();

  function submition(i:any) {
    i.preventDefault();

console.log("SUBMITTED");


console.log({
  email,
  password,
});


    loginMutation.mutate({
      email,
      password,
    },

    {onSuccess:(data)=>{

console.log("SUCCESS", data);


localStorage.setItem("token", data.token);

console.log(window.location.pathname)
document.cookie =`token=${data.token};path =/`
router.replace('/dashboard')
setTimeout(()=>{console.log(window.location.pathname)})
console.log("AFTER REDIRECT")

}


,

onError:(err:any)=>{

  console.log(err.response?.status);


console.log("FAILED RESPONSE:", err.response?.data);
  console.log("FULL ERROR:", err);
  console.log("response:", err.response);
  console.log("request:", err.request);
  console.log("message:", err.message);
  }
    }
    );
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.leftside}>
        <div className={styles.lc}>
          <Image
            src="/hvl.svg"
            alt="HelioVet Logo"
            width={128}
            height={128}
            priority
            className={styles.logo}
          />

          <h1>HelioVET</h1>

          <p>
            Professional veterinary clinic management platform trusted by
            leading practices
          </p>
        </div>
      </div>

      <div className={styles.rightside}>
        <div className={styles.header}>
          <h2>Welcome</h2>

          <p>Log in to access your clinic dashboard</p>
          <div className={styles.formWrapper}>
            <form className={styles.form} onSubmit={submition}>
              <label htmlFor="email">EMAIL ADDRESS</label>
           

              <input
                id="email"
                type='email'
                value={email}
                onChange={(i)=>setEmail(i.target.value)}
                placeholder="Please enter your email address"
              />


              <label htmlFor="password">PASSWORD</label>

           

              <input
                id="password"
                type="password"
                value={password}
                onChange={(i)=>setPassword(i.target.value)}
                placeholder="Please enter your password"
                className={styles.password}
              />


              <button type ="submit">Log In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}