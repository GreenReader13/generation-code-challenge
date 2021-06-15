import React, { Component } from 'react';

import Map from './Map/Map'
import MyStoresList from './List/MyStoresList'
import HeadBar from './HeadBar/HeadBar'

import './YourComponent.css'

import store_directory from "./backup.json";

/*
* Use this component as a launching-pad to build your functionality.
*
*/
class YourComponent extends Component {

  constructor(){
    super();
    var stores = store_directory;
    var myFavoriteStores = [];
    var title = "Mexico City Stores";
    var showStoreList = false;
    var listTitle = "My Favorite Stores";
    this.state = {
      stores: stores, 
      myFavoriteStores: myFavoriteStores, 
      title:title, 
      showStoreList:showStoreList,
      listTitle:listTitle
    };
    this.addFavoriteCallback = this.addFavoriteCallback.bind(this);
    this.removeFavoriteCallback = this.removeFavoriteCallback.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  addFavoriteCallback(name){
    if(window.confirm("Add to favorites?")){
      
    if (!this.state.myFavoriteStores.some((mystore) =>{
      return mystore.Name === name; })) {
        let myStores = [...this.state.myFavoriteStores, {Name:name}];
        this.setState({ myFavoriteStores : myStores });
        alert(`${name} added to favorites`)
    }
    }
  }

  removeFavoriteCallback(name){
    if (window.confirm("Remove from favorites?")){
      
      this.setState({myFavoriteStores: 
        this.state.myFavoriteStores.filter( store => {
          return store.Name !== name;
        })
      });
      
      alert(`${name} removed from favorites`)
    } 
  }

  handleButton(){
    var display = (this.state.showStoreList)? false : true;
    this.setState({showStoreList:display});
  }

  render() {
    return (
      <div style={divStyle} id="component">
        <div id = "headerBar">
          <HeadBar title = {this.state.title} callBackButton = {this.handleButton}/>
        </div>
        <div id = "content">
          <Map callBackStore = {this.addFavoriteCallback} stores = {this.state.stores} />
          <MyStoresList showStoreList = {this.state.showStoreList} 
                        myStores = {this.state.myFavoriteStores} 
                        callBackStoreRm = {this.removeFavoriteCallback}
                        listTitle = {this.state.listTitle}/>
        </div>
      </div>
    );
  }
}

var divStyle = {
  padding: 0,
  height: "100%",
  boxSizing: "border-box"
};

export default YourComponent;
