'use client'

import api from "@/app/util/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import ScheduleForm from "../../schedule/scheduleForm";
import InviteForm from "../../guest/inviteForm";
import { Curriculum, Guest, Schedule } from "@/app/util/type";
import { useParams } from "next/navigation";

export default function Id() {

    const params = useParams();


    return (
        <>
            {params.id}
        </>
    )
}
