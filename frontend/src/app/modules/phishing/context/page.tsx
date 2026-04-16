import "../../modules.css"
import phishingModule from "../../../../../module_details/phishing_scams.json";
import Link from "next/link";

export function ModuleHeader(){
    const titleScreen = phishingModule.screens.find(
        (screen) => screen.id === "title-screen"
      );
    return(
        <div className="module_header">
            <h2>Modules → <b>Phishing Attacks</b></h2>
            <h1>
                {titleScreen.titleParts.start}
                <b>{titleScreen.titleParts.highlight}</b>
                {titleScreen.titleParts.middle}
                <span>{titleScreen.titleParts.accent}</span>
            </h1>
        </div>
    )
}

export function PhishingEmailMockup() {
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
            <h1>hello@financialservices-secure.net</h1>
            <p>To: chase@ey.com</p>
          </div>
  
          <div className="email_divider"></div>
  
          <div className="email_content">
            <p>Hello Chase,</p>
  
            <p>
              We've noticed unusual activity on your account. Please verify
              your credentials immediately to avoid account suspension.
            </p>
  
            <p>Click below to confirm your identity:</p>
  
            <button className="verify_button">
              → Verify Now: financialservices-secure.net/verify
            </button>
  
            <p>
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

export default function PhishingContext() {
    const contextScreen = phishingModule.screens.find(
        (screen) => screen.id === "context-screen"
      );
      const currentStep = 2;
      const totalSteps = 8;
      const progressPercent = (currentStep / totalSteps) * 100;
    return(
        <div>
            <ModuleHeader/>
            <div className="context_content">
                <PhishingEmailMockup/>
                <div className="context_text">
                    <h1>Problem Context</h1>
                    <p>{contextScreen.context}</p>
                    <Link href="/modules/phishing/mcq" className="button">
                        Next
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
    )
}