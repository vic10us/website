import React, { Component } from 'react';
import './neon-button.scss';

interface IProps {
    href: string,
    color: string,
    target?: string | undefined,
    label?: string | undefined,
    onClick?: () => void,
}

interface IState {
    target: string;
    label: string;
}

class NeonButton extends Component<IProps, IState> {

    static defaultProps: IProps = {
        href: "#",
        color: "hotpink",
        target: "_blank",
        label: "Click Me",
        onClick: () => {
            //? do nothing
        },
    };
    constructor(props: IProps) {
        super(props);
    }

    handleClick(e) {
        if (this.props && this.props.onClick != undefined) {
            this.props.onClick();
        }
    }

    render() {
        return (
            <div className="neon-button__container">
                <a href={this.props.href} 
                   onClick={this.handleClick.bind(this)}
                   className={`neon-button__button btn-color-${this.props.color}`}>{this.props.label}</a>
            </div>
        );
    }
}

export default NeonButton;