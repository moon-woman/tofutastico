import React, { useEffect, useState } from 'react';
import './index.css';
import Recetas from './components/Recetas';
import RecetaLoadingComponent from './components/RecetaLoading';
import Hero from './components/Home-hero';


function App(){
  const RecetaLoading = RecetaLoadingComponent(Recetas);
  const [appState, setAppState] = useState({
    loading: false,
    recetas: null,
  });

  useEffect(() => {
    setAppState({loading: true});
    const apiUrl = 'http://127.0.0.1:8000/api/recientes/';
    fetch(apiUrl)
      .then((data) => data.json())
      .then((recetas) => {
        setAppState({loading: false, recetas: recetas});
      });
  }, [setAppState]);

  return (
    <div className='App overflow-x-hidden'>
      <Hero />
      <h1 className='font-montserrat text-4xl text-center pt-10' id='discover'>Últimas Recetas</h1>
      <RecetaLoading isLoading={appState.loading} recetas={appState.recetas} />
    </div>
  );
}

export default App;