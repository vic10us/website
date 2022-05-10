import React, { Component } from "react";
import TypeWriterEffect from "./components/typewriter/typewriter";
import vic10usLogo from "./assets/images/vic10us-logo-glow.svg";
import SocialsView from "./components/socials/socials";
// import { ReactComponent as Vic10usLogo } from "./assets/images/vic10us-logo.svg";
import NeonButton from './components/neon-button';
// import RainbowCircle from "./components/rainbow-circle/rainbow-circle";

class LayoutOne extends Component {

  texts: string[] = [
    "Engineer^250.^250.^250.^250",
    "Streamer^250.^250.^250.",
    "DIY-er^250.^250.^250.",
  ];

  openMenu = () => {
    // do something eventually
    console.log("Opening menu");
    return false;
  };

  render() {
    return (
      <main id="home">
        <div className="nav-container">
          <div className="nav-background"></div>
          <div className="nav-border"></div>
          <nav>
            <h1 id="logo">
              <a href="#home">vic10us</a>
            </h1>
            <label id="nav-toggle-label" htmlFor="nav-toggle">
              <i className="fa fa-bars"></i>
            </label>
            <input id="nav-toggle" type="checkbox" className="nav-toggle" />
            <ul>
              <li>
                <a className="nav__about" href="#about">
                  About Me
                </a>
              </li>
              <li>
                <a className="nav__projects" href="#about">
                  Projects
                </a>
              </li>
              {/* <li>
                <NeonButton label="About Me" color="neonpink" href="#about" />
              </li>
              <li>
                <NeonButton label="Projects" color="green" href="#projects" />
              </li> */}
              {/*}
              <li>
                <NeonButton label="Socials" color="blue" href="#socials" />
              </li> */}
              <li>
                <a className="nav__socials" href="#socials">
                  Socials
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <section className="home">
          <div className="showcase">
            <h2>vic10us</h2>
            {/* <div className="showcase__img__shadow"></div> */}
            <div className="showcase__img">
              <img src={vic10usLogo} alt="vic10us" />
            </div>
            {/* <div className="img"></div> */}
            <div className="info">
              {/* <RainbowCircle /> */}
              <h3>
                <TypeWriterEffect
                  prompt="> "
                  texts={this.texts}
                  cursor="▋"
                  loop="true"
                />
              </h3>
              <p>
                quasi-polygot/jack-of-all-trades that builds things with tech,
                but mostly I try to help others build their own things
              </p>
            </div>
          </div>
        </section>
        <section id="about" className="about">
          <div className="about__container">More to come</div>
        </section>
        <section id="socials" className="socials">
          <SocialsView />
        </section>
      </main>
    );
  }
}

export default LayoutOne;
