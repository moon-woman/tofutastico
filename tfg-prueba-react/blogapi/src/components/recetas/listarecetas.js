import React, { useEffect, useState } from 'react';
import Recetas from '../Recetas';
import RecetaLoadingComponent from '../RecetaLoading';


function Lista(){
  const RecetaLoading = RecetaLoadingComponent(Recetas);
  const [appState, setAppState] = useState({
    loading: false,
    recetas: null,
  });

  useEffect(() => {
    setAppState({loading: true});
    const apiUrl = 'http://127.0.0.1:8000/api/post/';
    fetch(apiUrl)
      .then((data) => data.json())
      .then((recetas) => {
        setAppState({loading: false, recetas: recetas});
      });
  }, [setAppState]);

  return (
    <div className='listado-recetas pt-56'>
      <h1 className='font-montserrat text-4xl text-center pt-10'>Todas las recetas</h1>
      <RecetaLoading isLoading={appState.loading} recetas={appState.recetas} />
    </div>
  );
}

export default Lista;