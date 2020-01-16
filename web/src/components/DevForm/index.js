import React, { useState, useEffect } from 'react';
import './styles.css';

const DevForm = ({ onSubmit }) => {

    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();    
        await onSubmit({ github_username, techs, latitude, longitude });
        setGithubUsername('');
        setTechs('');
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
        }, (erro) => {
            console.log(erro);
        }, {
            timeout: 30000
        });
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário do Github</label>
                <input
                    name="github_username"
                    value={github_username}
                    required
                    id="github_username"
                    onChange={(e) => setGithubUsername(e.target.value)}
                />
            </div>
            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input
                    name="techs"
                    value={techs}
                    required
                    id="techs"
                    onChange={(e) => setTechs(e.target.value)}
                />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        name="latitude"
                        type="number"
                        value={latitude}
                        required
                        id="latitude"
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                </div>
                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input
                        name="longitude"
                        type="number"
                        value={longitude}
                        required
                        id="longitude"
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                </div>
            </div>

            <button type="submit">Enviar</button>
        </form>
    );
}

export default DevForm;