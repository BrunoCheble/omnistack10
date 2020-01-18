import React, { useState } from 'react';

import { SearchForm, SearchInput, SearchBtn } from './styles';

import { MaterialIcons } from '@expo/vector-icons';

const SearchDev = ({ loadDevs }) => {

    const [techs, setTechs] = useState('');

    function handleLoadDev() {
        loadDevs(techs);
    }

    return (
        <SearchForm>
            <SearchInput
                placeholder="Buscar devs por techs..."
                placeholderTextColor="#999"
                autoCapitalize="words"
                value={techs}
                onChangeText={setTechs}
                autoCorrect={false}
            />
            <SearchBtn  onPress={handleLoadDev}>
                <MaterialIcons name="my-location" size={20} color="#FFF" />
            </SearchBtn>
        </SearchForm>
    );
}

export default SearchDev;