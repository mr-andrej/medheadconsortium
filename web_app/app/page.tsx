import Image from 'next/image'
import React from "react";
import HospitalList from "@/components/HospitalList";
import PatientList from "@/components/PatientList";

export default function Home() {
  return (
      <div>
        <h1>Welcome to MedHead Frontend</h1>
          <HospitalList />
          <PatientList/>
      </div>
  )
}
