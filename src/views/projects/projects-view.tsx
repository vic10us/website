import React, { Component, RefObject } from "react";
import './projects-view.scss';

class ProjectsView extends Component {
    private #myRef: RefObject<HTMLElement>;

    constructor() {
        super();
        this.#myRef = React.createRef();
    }

    componentDidMount() {
        const element: HTMLElement = this.#myRef.current;
        element.addEventListener('mousemove', this.trackMouse);
    }

    trackMouse = (e: MouseEvent) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left; //x position within the element.
        const y = e.clientY - rect.top;  //y position within the element.
        const element = document.querySelector('.cursor') as HTMLElement;
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
    }

    render() {
        return (
            <div ref={this.#myRef}>
                <div className="cursor"></div>
                {Array.from({ length: 20 }, (_, x) => 
                <div key={`row${x}`} className={`row row-${x}`}>
                    {Array.from({length: 28}, (_, y) => <div key={`row${x}col${y}`} className={`hexagon hexagon-${y}`}></div>)}
                </div>
                )}
            </div>
        );
    }
}

export default ProjectsView;