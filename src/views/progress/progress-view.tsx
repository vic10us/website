import React, { Component, RefObject } from "react";
import './progress-view.scss';
import CircularProgress from "./circular-progress";
import NeonButton from '../../components/neon-button';

interface IGauge {
    id: string;
    progress: number;
    color: string;
    title: string;
    size: number;
}

interface IState {
    gauges: IGauge[];
}

interface IProps {
    title?: string;
}

class ProgressView extends Component<IProps, IState> {
    
    private #myRef: RefObject<HTMLElement>;

    constructor(props: IProps) {
        super(props);
        this.#myRef = React.createRef();
    }

    componentDidMount() {
        this.setState({
            percentage: Math.trunc(Math.random()*100),
            gauges: [
            {
                id: "html",
                progress: Math.trunc(Math.random()*100),
                color: "#04fc43",
                title: "Html",
                size: 100
            },
            {
                id: "css",
                progress: Math.trunc(Math.random()*100),
                color: "#fee800",
                title: "Css",
                size: 100
            },
            {
                id: "js",
                progress: Math.trunc(Math.random()*100),
                color: "#ff00be",
                title: "JavaScript",
                size: 100
            }
        ]});
    }

    render() {
        return (
            <>
                <div className="demo">
                    {this.state && this.state.gauges && this.state.gauges.map((e) => (
                        <CircularProgress key={e.title} progress={e.progress} color={e.color} title={e.title} size={e.size}></CircularProgress>
                    ))}
                </div>
                {/* <button onClick={this.clickme}>Randomize</button> */}
                <NeonButton className="button" href="#progress" color="hotpink" onClick={this.clickme} label="Randomize" />
            </>
        );
    }
    
    clickme = () => {
        const newGauges = this.state.gauges.map((e) => {
            return Object.assign({}, e, {
                progress: Math.trunc(Math.random()*100)
            });
        });
        this.setState({gauges: newGauges});
        this.forceUpdate();
    }
}

export default ProgressView;