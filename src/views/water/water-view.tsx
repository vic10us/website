import React, { Component, RefObject } from "react";
import "./water-view.scss";
import cloud1 from "../../assets/images/cloud1.png";
import cloud2 from "../../assets/images/cloud2.png";
import cloud3 from "../../assets/images/cloud3.png";
import cloud4 from "../../assets/images/cloud4.png";
import cloud5 from "../../assets/images/cloud5.png";

interface IProps {
  text: string;
  color: string;
}

interface IState {
  text: string;
  color: string;
}

class WaterView extends Component<IProps, IState> {
  private #myRef: RefObject<HTMLElement>;

  constructor(props: IProps) {
    super(props);
    this.state = { 
        ...this.state, 
        text: props.text || "Water",
        color: props.color || "hsl(199, 100%, 50%)"
    };
    this.#myRef = React.createRef();
  }

  componentDidMount() {
    //* do nothing for now
  }

  render() {
    return (
      <>
        <div className="clouds">
          <img src={cloud1} style={{ "--i": "1" }} />
          <img src={cloud2} style={{ "--i": "2" }} />
          <img src={cloud3} style={{ "--i": "3" }} />
          <img src={cloud4} style={{ "--i": "4" }} />
          <img src={cloud5} style={{ "--i": "5" }} />
        </div>
        <div ref={this.#myRef} style={{ "--clr": `${this.state.color}` }}>
          {[0, 1].map((i) => (
            <h2 key={`text-${i}`}>{this.state.text}</h2>
          ))}
        </div>
      </>
    );
  }
}

export default WaterView;
