import React from "react";

class MyStoresList extends React.Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        this.props.callBackStoreRm(event.target.id)
    }

    render(){
        return (
            <div className = "list">
                <ul type = "none">
                  {this.props.myStores.map( element => 
                    <li key = {element.Name} id = {element.Name} onClick={this.handleClick}>{element.Name}</li>
                  )}
                </ul>
            </div>
         );
    }
};

export default MyStoresList;