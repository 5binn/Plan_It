'use client'

import { useEffect, useState } from "react";
import Logoutted from "./logoutted";
import './styles.css'
import api from "./util/api";
import loginInfo from "./util/isLogin";
import { config } from "process";

export default function Home() {

  const [isLogIn, setIsLogIn] = useState(false);



  return (
    <div className="">
      
      <Logoutted></Logoutted>

    </div>
  );
}
