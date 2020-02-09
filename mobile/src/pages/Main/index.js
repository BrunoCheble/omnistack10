import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { Keyboard } from 'react-native';

import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import api from '../../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../../services/socket';

import DevMarker from '../../components/DevMarker';
import DevSearch from '../../components/DevSearch';

const Main = ({ navigation }) => {

    const [currentRegion, setCurrentRegion] = useState(null);
    const [devs, setDevs] = useState([]);

    function setupWebsocket(techs) {
        disconnect();
        const { latitude, longitude } = currentRegion;
        connect(latitude, longitude, techs);
    }

    async function loadDevs(techs) {
        Keyboard.dismiss();
        const { latitude, longitude } = currentRegion;
        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        });

        setDevs(response.data);
        setupWebsocket(techs);
    }

    function handleRegionChanged(region) {
        setCurrentRegion(region);
    }
/*
    useEffect(() => {
        if (currentRegion != null) {
            loadDevs();
        }
    }, [currentRegion]);
*/
    useEffect(() => {
        subscribeToNewDevs(dev => setDevs([...devs, dev]));
    }, [devs]);
    
    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });

                const { latitude, longitude } = coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                });
            }
        }
        loadInitialPosition();
    }, []);
/*
    if (!currentRegion) {
        return null;
    }*/
    return (
        <>
            <MapView
                onRegionChangeComplete={handleRegionChanged}
                initialRegion={currentRegion}
                style={{ flex: 1 }}
            >
                {devs.map((dev) => (<DevMarker key={dev._id} dev={dev} navigation={navigation} />))}
            </MapView>
            <DevSearch loadDevs={loadDevs} />
        </>
    );
}

export default Main;