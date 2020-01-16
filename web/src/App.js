import React from 'react';

import './App.css';
import './global.css';
import './Sidebar.css';

const App = () => (
  <div id="app">
    <aside>
      <strong>Cadastrar</strong>
      <form>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do Github</label>
          <input name="github_username" id="username_github" />
        </div>
        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input name="techs" id="techs" />
        </div>

        <div className="input-block">
          <div>
            <label htmlFor="latitude">Latitude</label>
            <input name="latitude" id="latitude" />
          </div>
          <div>
            <label htmlFor="longitude">Longitude</label>
            <input name="longitude" id="longitude" />
          </div>
        </div>
      </form>
    </aside>
    <main></main>
  </div>
);

export default App;