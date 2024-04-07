import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { UserButton, useAuth } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router=useRouter();
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  useEffect(()=>{
    if(userId){
      router.push('/home')
    }else{
      router.push('/sign-in')
    }
  },[])
}
