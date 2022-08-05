import React from 'react'
import { GoogleMap, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';

// MAP RELATED CODE
// https://www.npmjs.com/package/@react-google-maps/api


const containerStyle = {
    width: '95%',
    height: '500px'
};

const center = {
    lat: 53.35014,
    lng: -6.266155,
};


const MyComponent = (props) => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyC0205U55u3k8w274zxOl0h5Fr15D7Nc1U"
    })

    const route = props.items;

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
        >


            {/*this.state.props.items.map(item => {
                return (
                    <Marker
                        position={item.latlng}
                    />
                );
            })*/}
        </GoogleMap>
    ) : <></>
}

export default React.memo(MyComponent)

