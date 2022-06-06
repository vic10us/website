import React, { Component, RefObject } from "react";
import "./progress-view.scss";
import CircularProgress from "./circular-progress";
import NeonButton from "../../components/neon-button";

interface IGauge {
  id: string;
  progress: number;
  color: string;
  title: string;
  size: number;
}

interface IState {
  gauges: IGauge[];
  windowHeight: number;
  windowWidth: number;
}

interface IProps {
  title?: string;
}

class ProgressView extends Component<IProps, IState> {
  private #myRef: RefObject<HTMLElement>;
  defaultState: IProps = {
    gauges: [],
    windowHeight: 0,
    windowWidth: 0,
  };

  constructor(props: IProps) {
    super(props);
    this.#myRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      ...this.defaultState,
      gauges: [
        {
          id: "html",
          progress: Math.trunc(Math.random() * 100),
          color: "#04fc43",
          title: "Html",
          size: 100,
        },
        {
          id: "css",
          progress: Math.trunc(Math.random() * 100),
          color: "#fee800",
          title: "Css",
          size: 100,
        },
        {
          id: "js",
          progress: Math.trunc(Math.random() * 100),
          color: "#ff00be",
          title: "JavaScript",
          size: 100,
        },
      ],
    });

    const debouncedHandleResize = this.debounce(function handleResize(e) {
      console.log("debouncedHandleResize");
      this.setState({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
      });
    }, 100);
    window.addEventListener("resize", debouncedHandleResize);

    //   return _ => {
    //     window.removeEventListener('resize', debouncedHandleResize)
  }

  getWindowSize() {
    return {
      height: this.state && this.state.windowHeight || window.innerHeight,
      width: this.state && this.state.windowWidth || window.innerWidth,
    };
  }

  debounce(fn, ms) {
    let timer;
    return (_) => {
      clearTimeout(timer);
      timer = setTimeout((_) => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }

  getGaugeSize(gauge: IGauge) {
    const { height, width } = this.getWindowSize();
    const { size } = gauge;
    const hSize = height <= 600 ? size * 0.4 : size;
    const wSize = width <= 820 ? size * 0.8 : size;
    const minSize = Math.min(hSize, wSize);
    return minSize;
  }

  render() {
    return (
      <>
        <div className="demo">
          {this.state &&
            this.state.gauges &&
            this.state.gauges.map((e) => (
              <CircularProgress
                key={e.title}
                progress={e.progress}
                color={e.color}
                title={e.title}
                size={this.getGaugeSize(e)}
              ></CircularProgress>
            ))}
        </div>
        {/* <button onClick={this.clickme}>Randomize</button> */}
        <NeonButton
          className="button"
          href="#progress"
          color="hotpink"
          onClick={this.clickme}
          label={`Randomize`}
        />
      </>
    );
  }

  clickme = () => {
    const newGauges = this.state.gauges.map((e) => {
      return Object.assign({}, e, {
        progress: Math.trunc(Math.random() * 100),
      });
    });
    this.setState({ gauges: newGauges });
    this.forceUpdate();
  };
}

export default ProgressView;
