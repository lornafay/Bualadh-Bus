import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';

// MAP RELATED CODE
// https://www.npmjs.com/package/@react-google-maps/api


const containerStyle = {
    width: '100%',
    height: '100%'
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
            {route.length !== 0 && (route.map((item) => (
                <Marker
                    position={item.latlng}
                    // icon made by <a href="https://www.flaticon.com/authors/kmg-design"
                    icon={{
                        path: "M 10 10 L 30 10 L 20 30 z",
                        scale: 0.8,
                        fillColor: "#6a38c7",
                        fillOpacity: 0.9
                    }}
                />
            )))}
        </GoogleMap>
    ) : <></>
}

export default React.memo(MyComponent)

