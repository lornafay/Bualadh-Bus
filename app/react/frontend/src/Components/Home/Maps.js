import React, { Component } from "react";
import GoogleMaps from "simple-react-google-maps";

export default class Maps extends Component {
    render() {
      return (
        <div id='map-table'>
          <GoogleMaps 
            apiKey={"AIzaSyC0205U55u3k8w274zxOl0h5Fr15D7Nc1U"}
            style={{ height: "550px", width: "600px"}}
            zoom={12}
            center={{
              lat: 53.350140,
              lng: -6.266155
            }}
          />
        </div>
      )
    }

}