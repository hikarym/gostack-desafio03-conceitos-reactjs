import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect( () => {
    api.get('/repositories').then( ({ data }) => {
      setRepositories(data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {       
      title: `Ecoleta NLW ${Date.now()}`, 
      url: "https://github.com/hikarym/nlw-ecoleta",
      techs: "NodeJS, ReactJS, ReactNative",
      likes: 0       
    }); 

    const repository = response.data;

    setRepositories([ ...repositories, repository ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const repositoriesUpdated = repositories.filter(repository => repository.id !== id);

    setRepositories(repositoriesUpdated);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.id}>          
          {repository.title}
          <button onClick={() => {
              return handleRemoveRepository(repository.id);
            }}>
            Remover
          </button>
        </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
