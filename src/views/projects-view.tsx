import React, { Component } from "react";
import './projects-view.scss';

class ProjectsView extends Component {
    render() {
        return (
            <>
                {Array.from({ length: 20 }, (_, x) => 
                <div key={`row${x}`} className={`row row-${x}`}>
                    {Array.from({length: 28}, (_, y) => <div key={`row${x}col${y}`} className={`hexagon hexagon-${y}`}></div>)}
                </div>
                )}
            </>
        );
    }
}

export default ProjectsView;