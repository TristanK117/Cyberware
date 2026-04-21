"use client";
import { useState } from "react";
import { ModuleHeader } from "../context/page";
import phishingModule from "../../../../../module_details/phishing_scams.json";
import "../../modules.css";
import Link from "next/link"

type PhishingEmailMockupProps = {
    selectedClues: string[];
    onClueClick: (id: string) => void;
  };
  
  function PhishingEmailMockup({
    selectedClues,
    onClueClick,
  }: PhishingEmailMockupProps) {
    return (
      <div className="phishing_email_card">
        <div className="phishing_email_topbar">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
  
        <div className="phishing_email_body">
          <h2 className="email_subject">
            <span className="subject_icon">📧</span>
            Email Subject: <span>Urgent: Verify Your Account</span>
          </h2>
  
          <div className="email_meta">
            <h1
              className={`clickable_clue ${
                selectedClues.includes("sus-sender-address") ? "active" : ""
              }`}
              onClick={() => onClueClick("sus-sender-address")}
            >
              hello@financialservices-secure.net
            </h1>
  
            <p>To: chase@ey.com</p>
          </div>
  
          <div className="email_divider"></div>
  
          <div className="email_content">
            <p>Hello Chase,</p>
  
            <p
              className={`clickable_clue ${
                selectedClues.includes("unexpected-request") ? "active" : ""
              }`}
              onClick={() => onClueClick("unexpected-request")}
            >
              We've noticed unusual activity on your account. Please verify
              your credentials immediately to avoid account suspension.
            </p>
  
            <p>Click below to confirm your identity:</p>
  
            <button
              className={`verify_button clickable_clue ${
                selectedClues.includes("embedded-link") ? "active" : ""
              }`}
              onClick={() => onClueClick("embedded-link")}
            >
              → Verify Now: financialservices-secure.net/verify
            </button>
  
            <p
              className={`clickable_clue ${
                selectedClues.includes("urgent-language") ? "active" : ""
              }`}
              onClick={() => onClueClick("urgent-language")}
            >
              This link expires in <span className="danger_text">24 hours</span>.
              Failure to act may result in your account being locked.
            </p>
          </div>
  
          <div className="external_warning">
            ⚠ External sender — verify before clicking any links
          </div>
        </div>
      </div>
    );
  }

export default function InteractiveDebrief() {
  const debriefScreen = phishingModule.screens.find(
    (screen) => screen.id === "debriefing-screen"
  );

  const [selectedClues, setSelectedClues] = useState<string[]>([]);

  if (!debriefScreen || !debriefScreen.cards) {
    return <div>Debrief screen data not found.</div>;
  }

  const handleClueClick = (id: string) => {
    setSelectedClues((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  const visibleCards = debriefScreen.cards.filter((card) =>
    selectedClues.includes(card.id)
  );

  const allCardsShown = selectedClues.length === debriefScreen.cards.length;

  const currentStep = 4;
  const totalSteps = 6;
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div>
      <ModuleHeader />

      <div className="debrief_body">
        <PhishingEmailMockup
          selectedClues={selectedClues}
          onClueClick={handleClueClick}
        />

        <div className="debrief_body_text">
          <h1 className="title">{debriefScreen.title}</h1>
          <h2 className="subtitle">{debriefScreen.instructions}</h2>

          {visibleCards.map((card) => (
            <div className="debrief_cards" key={card.id}>
              <h2 className="number">{card.number}</h2>
              <div className="debrief_card_context">
                <h2 className="debrief_header">{card.label}</h2>
                <p className="debrief_card_body">{card.explanation}</p>
              </div>
            </div>
          ))}
            {allCardsShown && (
            <div className="debrief_next_button_wrapper">
                <Link href="/modules/phishing/best-practices">
                <button className="debrief_next_button">
                Next
                </button>
                </Link>
            </div>
            )}
        </div>
      </div>
      <div className="module_progress_footer">
        <div className="module_progress_bar">
          <div
            className="module_progress_fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <span>
          {currentStep}/{totalSteps}
        </span>
      </div>
    </div>
  );
}