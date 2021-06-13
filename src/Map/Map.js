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
              this.setState({intervalId: setInterval(this.addStores(), 200)});}
            );
          }
          );
        });
      }
    );
  }

  addStores() {
    var icounter = 0;
    let storeNum;
    for (icounter = 0; icounter < 9; icounter ++){
      storeNum = icounter + this.state.ofset;
      if(storeNum < this.props.stores.length){

        this.state.geocoder.geocode( 
          {'address': this.props.stores[storeNum].Address}, 
          (results, status) => {
            if(status === "OK") {
              if (results != null){
                var marker = new window.google.maps.Marker({
                  map: this.state.map,
                  position: results[0].geometry.location,
                  title: this.props.stores[storeNum].Name
                });
                
                marker.addListener( "click", () =>{
                  this.props.callBackStore(marker.title);
                });
              }
            } else {
              console.log(`Location ${this.props.stores[storeNum].Name} Error` )
            }
        });
      } else {
        icounter = 10;
        clearInterval(this.state.intervalId);
      }
    }
    this.setState({ofset: this.state.ofset + 10})
  }

  render(){
    return <div id= "map"></div>  
  }
}

export default Map;