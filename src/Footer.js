import React, { Component } from 'react';
import './sass/app.scss';
import logo from "./assets/logo.png";

class Footer extends Component{

    render() {
        return(
            <React.Fragment>
                <footer>
                    <div className="footerContainer wrapper">

                        <div className="footerTextContainer">
                            <div className="footerLogoContainer">
                                <img src={logo} alt=""></img>
                            </div>
                            <div className="footerText">
                                <p>Urban Botany is a small web-based app built and designed by Sandy Pranjic using React and Firebase. It was built with the intention of encouraging others to take up caring for houseplants as a hobby in hopes of reigniting people’s connection to Mother Nature.</p>
                            </div>
                        </div>

                    </div>
                </footer>



            </React.Fragment>
        )
    }

}

export default Footer;