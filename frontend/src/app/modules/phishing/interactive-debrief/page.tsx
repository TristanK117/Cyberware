"use client";
import { useState } from "react";
import { PhishingEmailMockup, ModuleHeader } from "../context/page";
import phishingModule from "../../../../../module_details/phishing_scams.json";
import "../../modules.css";
import Link from "next/link"

export default function InteractiveDebrief(){
    return(
        <div>
            <ModuleHeader/>
            <PhishingEmailMockup/>
        </div>
    )
}