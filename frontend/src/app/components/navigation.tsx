import "./css/navigation.css";

function LogoIcon() {
    return (
      <svg
        className="logo_icon"
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="35"
        viewBox="0 0 36 35"
        fill="none"
      >
        <g clipPath="url(#clip0_3037_156)">
          <path
            d="M5.5 37L18 3L31 37"
            stroke="currentColor"
            strokeWidth="7"
          />
        </g>
        <defs>
          <clipPath id="clip0_3037_156">
            <rect width="36" height="35" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }

function Logo() {
    return(
        <div className="logo">
            <h1 className="logo_words start">Cyber</h1>
            <LogoIcon/>
            <h1 className="logo_words end">ware</h1>
        </div>
    )
};
  

  export function Navbar() {
      return(
          <nav className="navbar">
              <Logo/>
              <div className="navigation">
                  <a href="#">Modules</a>
                  <a href="#">Chatbot</a>
                  <a href="#">About</a>
              </div>
              <button className="login_button">
                  Login / Sign-up
              </button>
          </nav>
      );
  };

  export function Footer() {
      return(
        <footer className="footer">
          <Logo/>
          <div className="navigation">
            <a href="#">About Us</a>
            <a href="#">FAQs</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Contact</a>
          </div>
          <p>© 2026 CyberAware. All rights reserved.</p>
        </footer>
      )
  }