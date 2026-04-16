"use client";
import { PhishingEmailMockup, ModuleHeader } from '../context/page'
import phishingModule from "../../../../../module_details/phishing_scams.json";
import "../../modules.css"
import { useState } from "react";

export default function PhishingMCQ() {
  const mcqScreen = phishingModule.screens.find(
    (screen) => screen.id === "viewing-decision-screen"
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!mcqScreen || mcqScreen.type !== "decision") {
    return <div>MCQ screen not found.</div>;
  }


  const currentStep = 3;
  const totalSteps = 8;
  const progressPercent = (currentStep / totalSteps) * 100;

  const selectedOption =
    mcqScreen.options.find((option) => option.id === selectedId) || null;

    const canGoNext = selectedOption?.isCorrect === true;

  return (
    <div className="mcq_page">
      <ModuleHeader />

      <div className="mcq_content">
        <PhishingEmailMockup />

        <div className="mcq_right">
          <div className="mcq_question">
            <h2>Question 1 of 3</h2>
            <h1>
              What is the <b>BEST</b> course of action?
            </h1>
          </div>

          <div className="mcq_options">
            {mcqScreen.options.map((option) => {
              const isSelected = selectedId === option.id;
              const isWrongSelected = isSelected && !option.isCorrect;
              const isCorrectSelected = isSelected && option.isCorrect;

              return (
                <label
                  key={option.id}
                  className={`mcq_option ${
                    isWrongSelected
                      ? "wrong"
                      : isCorrectSelected
                      ? "correct"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="phishing-question"
                    value={option.id}
                    checked={isSelected}
                    onChange={() => setSelectedId(option.id)}
                  />
                  <span className="custom_radio"></span>
                  <span className="option_text">{option.label}</span>
                </label>
              );
            })}
          </div>

          {selectedOption && (
            <div
              className={`mcq_feedback ${
                selectedOption.isCorrect ? "correct" : "wrong"
              }`}
            >
              <p>{selectedOption.description}</p>
            </div>
          )}

            <div className="mcq_next_button_wrapper">
            <button className="mcq_next_button" disabled={!canGoNext}>
                Next
            </button>
            </div>
        </div>
      </div>
      <div className="module_progress_footer">
                <div className="module_progress_bar">
                <div
                    className="module_progress_fill"
                    style={{ width: `${progressPercent}%` }}
                ></div>
                </div>
                <span>{currentStep}/{totalSteps}</span>
        </div>
    </div>
  );
}