import "../modules.css"
import phishingModule from "../../../../module_details/phishing_scams.json";
import Link from "next/link";

export default function PhishingPage() {
    const titleScreen = phishingModule.screens.find(
        (screen) => screen.id === "title-screen"
      );
      const currentStep = 1;
      const totalSteps = 8;
      const progressPercent = (currentStep / totalSteps) * 100;
      return (
        <div>
            <div className="opening_page">
                <div className="modules_text">
                    <h1>
                        {titleScreen.titleParts.start}
                        <b>{titleScreen.titleParts.highlight}</b>
                        {titleScreen.titleParts.middle}
                        <span>{titleScreen.titleParts.accent}</span>
                    </h1>

                    <h2>{titleScreen.subtitle}</h2>

                    <h3>SUMMARY</h3>
                    <ul>
                        {titleScreen.agenda.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="modules_image">
                    <img src={titleScreen.img} alt="opening page phishing image" />
                    <Link href="/modules/phishing/context" className="button">
                        Start Module
                    </Link>
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