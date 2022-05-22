import React, { Component, RefObject } from "react";
import './water-view.scss';
import cloud1 from '../../assets/images/cloud1.png';
import cloud2 from '../../assets/images/cloud2.png';
import cloud3 from '../../assets/images/cloud3.png';
import cloud4 from '../../assets/images/cloud4.png';
import cloud5 from '../../assets/images/cloud5.png';

class WaterView extends Component {
    private #myRef: RefObject<HTMLElement>;
    text: string = "Water";

    constructor() {
        super();
        this.#myRef = React.createRef();
    }

    componentDidMount() {
    }

    render() {
        return (
            <>
            <div className="clouds">
                <img src={cloud1} style={{"--i":1;}} />
                <img src={cloud2} style={{"--i":2;}} />
                <img src={cloud3} style={{"--i":3;}} />
                <img src={cloud4} style={{"--i":4;}} />
                <img src={cloud5} style={{"--i":5;}} />
            </div>
            <div ref={this.#myRef}>
                {[0,1].map(i => <h2>{this.text}</h2>)}
            </div>
            </>
        );
    }
}

export default WaterView;