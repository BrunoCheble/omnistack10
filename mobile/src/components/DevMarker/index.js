import React from 'react';
import { Marker, Callout } from 'react-native-maps';

import { Thumb, Item, Techs, Name, Bio } from './styles';

const DevMarker = ({ dev, navigation }) => (
    <Marker
        coordinate={{
            latitude: dev.location.coordinates[1],
            longitude: dev.location.coordinates[0]
        }}>
        <Thumb source={{ uri: dev.avatar_url }} />
        <Callout onPress={() => { navigation.navigate('Profile', { github_username: dev.github_username }) }}>
            <Item>
                <Name>{dev.name}</Name>
                <Bio>{dev.bio}</Bio>
                <Techs>{dev.techs.join(', ')}</Techs>
            </Item>
        </Callout>
    </Marker>
);

export default DevMarker;