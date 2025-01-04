import React from 'react'
import './Footer.css';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";



const Footer = () => {
  return (
    <>
        <div className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-left">
                <div className="logo"><a href=""><span className="highlight">Q</span>uick<span>Bite!</span></a></div>
                <div className="footer-social-icons">
                    <a href="https://www.facebook.com/"><FaFacebook/></a>
                    <a href="https://www.instagram.com/"><FaInstagram /></a>
                    <a href="https://www.twitter.com/"><FaTwitter/></a>
                    <a href="https://www.linkedin.com/"><FaLinkedin /></a>
                </div>
                </div>
                <div className="footer-mid">
                <h2>QUICK BITE</h2>
                <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Shipping</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
                </ul>

                </div>
                <div className="footer-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1-198-162-1110</li>
                        <li>bite@quickbite.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">&copy; QuickBite.com - All Right Reserved.</p>
        </div>
    </>
  )
}

export default Footer
