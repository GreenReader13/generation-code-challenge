import React, { Component } from 'react';
import Map from './Map/Map'
import MyStoresList from './List/MyStoresList'

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
    this.state = {stores: stores, myFavoriteStores: myFavoriteStores};
    this.addFavoriteCallback = this.addFavoriteCallback.bind(this);
    this.removeFavoriteCallback = this.removeFavoriteCallback.bind(this);
    this.locationCallback = this.locationCallback.bind(this);
  }

  addFavoriteCallback(name){
    if (!this.state.myFavoriteStores.some((mystore) =>{
      return mystore.Name === name; })) {
        let myStores = [...this.state.myFavoriteStores, {Name:name}];
        this.setState({ myFavoriteStores : myStores });
    };
  }

  removeFavoriteCallback(name){
    this.setState({myFavoriteStores: 
      this.state.myFavoriteStores.filter( store => {
        return store.Name !== name;
      })
    });
  }

  locationCallback(position, location){
    this.state.stores[position].Location = location;
  }

  render() {
    return (
      <div style={divStyle} id="json">
       <Map callBackStore = {this.addFavoriteCallback} stores = {this.state.stores} callBackStoreLocation={this.locationCallback}/>
       <MyStoresList myStores = {this.state.myFavoriteStores} callBackStoreRm = {this.removeFavoriteCallback}/>
      </div>
    );
  }
}

var divStyle = {
  border: 'red',
  borderWidth: 2,
  borderStyle: 'solid',
  padding: 0,
  height: "100%",
  boxSizing: "border-box",
};

export default YourComponent;
