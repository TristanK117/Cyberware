"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./navigation.css";

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
        <Link className="logo" href="/">
            <h1 className="logo_words start">Cyber</h1>
            <LogoIcon/>
            <h1 className="logo_words end">ware</h1>
        </Link>
    )
};
  

export function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe(); // cleanup on unmount
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/");
    };

    return(
        <nav className="navbar">
            <Logo/>
            <div className="navigation">
              <Link className="page_nav" href="/modules">Modules</Link>
              <Link className="page_nav" href="/chatbot">Chatbot</Link>
              <Link className="page_nav" href="/about">About</Link>
            </div>
            {user ? (
                <button onClick={handleLogout} className="login_button">
                    Logout
                </button>
            ) : (
                <Link href="/login" className="login_button">
                    Login / Sign-up
                </Link>
            )}
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