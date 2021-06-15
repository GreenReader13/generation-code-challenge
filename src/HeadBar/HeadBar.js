import React, { Component } from 'react';

import './HeadBar.css'

class HeadBar extends Component {
    constructor(props){
        super(props);
        var buttonClass = "container";
        
        this.state = {buttonClass:buttonClass};

        this.toggleButton = this.toggleButton.bind(this);
    }

    toggleButton(){
        this.props.callBackButton()
        var css = (this.state.buttonClass === "container") ? "container change": "container";
        this.setState({buttonClass:css});
    }

    render(){
        return(
            <div id = "bar">
                <div className={this.state.buttonClass} onClick={this.toggleButton}>
                    <div className="bar1" ></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <div id = "title">{this.props.title}</div>
            </div>
        );
    }
}

export default HeadBar;