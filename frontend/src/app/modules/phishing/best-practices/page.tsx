"use client";
import { useState } from "react";
import { ModuleHeader } from "../context/page";
import phishingModule from "../../../../../module_details/phishing_scams.json";
import "../../modules.css";
import Link from "next/link"

export default function BestPractices(){
    const bestPracticesScreen = phishingModule.screens.find(
        (screen) => screen.id === "best-practices-screen"
      );

      if (!bestPracticesScreen || !bestPracticesScreen.cards) {
        return <div>Best practices screen not found.</div>;
      }

    return(
        <div>
            <ModuleHeader/>
            <div className="best_practices_body">
                <h1 className="best_practices_title">{bestPracticesScreen.title}</h1>
                {bestPracticesScreen.cards.map((card) => (
                <div className="best_practices_cards" key={card.id}>
                    <h2 className="number">{card.number}</h2>
                    <div className="best_practices_card_context">
                    <h2 className="card_header">{card.title}</h2>
                    <p className="card_body">{card.description}</p>
                    </div>
                </div>
                ))}
                <Link href="/modules">
                    <button className="debrief_next_button">
                    Complete!
                    </button>
                </Link>
            </div>
        </div>
    )
}