import React, { Component, RefObject } from "react";
import './circular-progress.scss';

interface IProps {
    color?: string = "#04fc43";
    progress: number = 0;
    title?: string = "";
    size?: number = 70;
}

interface IState {
    percentage: number;
}

class CircularProgress extends Component<IProps, IState> {
    private #myRef: RefObject<HTMLElement>;
    
    static defaultProps: IProps = {
        color: "#04fc43",
        progress: 0,
        title: "",
        size: 70
    };

    const defaultState: IState = {
        percentage: 0
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            ...this.defaultState,
            percentage: this.props.progress
        };
        this.#myRef = React.createRef();
    }

    getCurcumference(radius: number): number {
        if (!radius) return 0;
        return Math.PI*(radius*2);
    }

    componentDidMount() {
        //? do nothing for now
        // console.log(this.props);
    }

    animateProgress(from: number, to: number, duration = 1) {

        if (from === to) return;
        if (from > to) {
            for (let i = from; i >= to; i--) {
                setTimeout(() => {
                    this.setState({
                        percentage: i
                    });
                }, (from-i)*duration);
            }
            return;
        }
        for (let i = from; i <= to; i++) {
            setTimeout(() => {
                this.setState({
                    percentage: i
                });
            }, i*duration);
        }
    }

    componentDidUpdate(last) {
        this.animateProgress(last.progress, this.props.progress, 5);
    }

    render() {
        return (
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            // <div className="circular-progress" style={{"--size": `${this.props.size}px`}}>
                <div className="card" style={{"--clr":this.props.color, "--size": `${this.props.size}px`}}>
                    <div className="percent" style={{"--percent": `${this.state.percentage}`}}>
                        <div className="dot"></div>
                        <svg>
                            <defs>
                                <linearGradient id="MyGradient">
                                    <stop offset="5%" stopColor="#F60" />
                                    <stop offset="95%" stopColor="#FF6" />
                                </linearGradient>
                                <radialGradient id="radial">
                                    <stop offset="50%" stopColor="transparent" />
                                    <stop offset="100%" stopColor="rgba(0, 0, 0, 0.2)" />
                                </radialGradient>
                            </defs>
                            <circle className="circle1"
                                cx={this.props.size} 
                                cy={this.props.size} 
                                r={this.props.size}>
                            </circle>
                            <circle className="circle2"
                                cx={this.props.size}
                                cy={this.props.size}
                                r={this.props.size}
                                strokeDasharray={this.getCurcumference(this.props.size)}
                                strokeDashoffset={this.getCurcumference(this.props.size) * (1 - this.state.percentage/100)}>
                            </circle>
                        </svg>
                        <div className="number">
                            <h2>{this.state.percentage}<span>%</span></h2>
                            <p>{this.props.title}</p>
                        </div>
                    </div>
                </div>
            // </div>
        );
    }
}

export default CircularProgress;