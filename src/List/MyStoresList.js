import React from "react";

import './MyStoresList.css'

class MyStoresList extends React.Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        this.props.callBackStoreRm(event.target.id)
    }

    render(){
        let width = 0;
        if (this.props.showStoreList){
            if (window.matchMedia("(min-width: 768px)").matches){
                width = 100;
            } else width = 40;
        }
        return (
            <div style = {{width: width + 'vh'}} className = "list">
                <div className = "listTitle">{this.props.listTitle}</div>
                <div id = "listContent">
                    <ul type = "none">
                    {this.props.myStores.map( element => 
                        <li key = {element.Name} id = {element.Name} onClick={this.handleClick}>{element.Name}</li>
                    )}
                    </ul>
                </div>
            </div>
         );
    }
};

export default MyStoresList;