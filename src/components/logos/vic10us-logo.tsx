import React, { Component } from 'react'
import './vic10us-logo.scss';

export default class Vic10usLogo extends Component {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 762.47 639.37">
        <defs>
          <linearGradient id="LogoGradient">
            <stop offset="5%" stopColor="#232323" />
            <stop offset="75%" stopColor="#131313" />
            <stop offset="95%" stopColor="#000" />
          </linearGradient>
        </defs>
        <g>
            <rect className="logo__blue3"    x="159.35" y="93.51"  width="205.51" height="91.41"/>
            <rect className="logo__blue3"   x="159.35" y="456.68" width="152.23" height="89.35"/>
            <rect className="logo__blue2"  x="72.97"  y="363.36" width="167.04" height="93.32"/>
            <rect className="logo__blue2" x="72.97"  y="182.8"  width="175.39" height="93.19"/>
            <rect className="logo__blue1" x="0"      y="276"    width="159.35" height="87.37"/>
        </g>
        <g>
            <polygon className="logo__main" points="762.47 460.66 762.47 639.37 393.14 639.37 393.14 546.04 299.83 546.04 299.83 456.68 212.46 456.68 212.46 363.36 117.15 363.36 117.15 275.99 211.96 275.99 211.96 182.67 299.33 182.67 299.33 93.32 392.65 93.32 392.65 0 761.98 0 761.98 178.71 483.99 178.71 483.99 270.04 388.69 270.04 388.69 363.36 389.18 363.36 389.18 369.33 484.5 369.33 484.5 460.66 762.47 460.66"/>
        </g>
      </svg>
    )
  }
}
