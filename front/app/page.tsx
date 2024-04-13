'use client'

import { useEffect, useState } from "react";
import Logoutted from "./logoutted";
import './styles.css'

export default function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    fetch("http://localhost:8070/api/v1/members/logout");
  }

  return (
    <div className="">
      
      <Logoutted></Logoutted>

    </div>
  );
}
