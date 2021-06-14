import {Loader} from "@googlemaps/js-api-loader";
import React from "react";

import "./Maps.css";

class Map extends React.Component {
  
  constructor(props) {
    super(props);

    var map;
    var loader;
    var geocoder;
    var intervalId;
    var ofset = 0;

    this.state = {
      map:map, 
      loader:loader, 
      geocoder:geocoder, 
      intervalId: intervalId,
      ofset: ofset
    };
  }

  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
    this.setState({
      loader: new Loader(
        {
            apiKey : "AIzaSyB0ECX_Q9HuYewLeibqzpR_YKc7TE14uoM",
            //apiKey : "AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A",
            version: "weekly",
        }
      )
    }, () => {
        this.state.loader.load().then(() => {
          this.setState({
            map:new window.google.maps.Map(document.getElementById("map"), {
              center: {lat: 19.435, lng: -99.138},
              zoom: 11,
            })
          }, () => {
            this.setState({
              geocoder: new window.google.maps.Geocoder()
            }, ()=> {
              this.addStores();
            });
          }
          );
        });
      }
    );
  }
  
  addMarker(address, name, i) {
    this.state.geocoder.geocode( 
      {'address': address}, 
      (results, status) => {
        if(status === "OK") {
          if (results != null){

            this.props.callBackStoreLocation(i, results[0].geometry.location);

            var marker = new window.google.maps.Marker({
              map: this.state.map,
              position: results[0].geometry.location,
              title: name
            });
            
            marker.addListener( "click", () =>{
              this.props.callBackStore(marker.title);
            });
          }
        } else {
          console.log(`Location ${name} Error` );
        }
    });
  }

  addStores() {
    let timeOut = 0;
    this.props.stores.forEach((store, i) => {
      if (store.Location == null){
        timeOut += 2000 ;
        setTimeout( () => this.addMarker(store.Address, store.Name, i), timeOut );
      } else {
        
        var marker = new window.google.maps.Marker({
          map: this.state.map,
          position: store.Location,
          title: store.Name
        });
        
        marker.addListener( "click", () =>{
          this.props.callBackStore(marker.title);
        });
      }
    })
  }

  render(){
    return <div id= "map"></div>  
  }
}

export default Map;