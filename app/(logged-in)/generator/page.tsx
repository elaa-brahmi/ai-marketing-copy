"use client"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../lib/firebase/firebaseConfig';
import React, { useState, useEffect } from 'react';
import { redirect } from "next/navigation";
export default function Generator(){
    /* useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
             
              console.log(user);
              const uid = user.uid;
              // ...
              console.log("uid", uid)
            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
             window.location.href = "/sign-up";
            }
          });
         
    }, []) */
    return(
        <div>generator</div>
    )
}