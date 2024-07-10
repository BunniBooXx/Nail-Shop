import React from 'react';
import { Link } from 'react-router-dom';
import { FaYoutube, FaTiktok, FaInstagram } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
            <nav className="grid grid-flow-col gap-4">
                <Link to="/aboutus" className="link link-hover">About us</Link>
                <Link to="/contact" className="link link-hover">Contact</Link>
                <Link to="/devinfo" className="link link-hover">Dev Info</Link>
                <Link to="/sizing-guide" className="link link-hover">Sizing Guide</Link>
            </nav>
            <nav className="grid grid-flow-col gap-2">
                <Link to="/privacy-policy" className="link link-hover">Privacy Policy</Link>
                <Link to="/terms-of-service" className="link link-hover">Terms Of Service</Link>
            </nav>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <Link to="https://www.youtube.com/@bunnybubblenails"><FaYoutube size={24} /></Link>
                    <Link to="https://www.tiktok.com/@bunnybubblenails"><FaTiktok size={24} /></Link>
                    <Link to="https://www.instagram.com/bunnybubblenails/"><FaInstagram size={24} /></Link>
                </div>
            </nav>
            <aside>
                <p>Copyright © 2024 - All right reserved by Bunny Bubble Nails </p>
            </aside>
        </footer>
    );
}

