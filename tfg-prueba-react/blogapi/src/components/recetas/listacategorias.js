import React, { useEffect, useState } from 'react';
import Categorias from './categorias';
import CategoriaLoadingComponent from './categorialoading';



function ListaCategorias(){
  const CategoriaLoading = CategoriaLoadingComponent(Categorias);
  const [appState, setAppState] = useState({
    loading: false,
    categorias: null,
  });

  useEffect(() => {
    setAppState({loading: true});
    const apiUrl = 'http://127.0.0.1:8000/api/categories/all/';
    fetch(apiUrl)
      .then((data) => data.json())
      .then((categorias) => {
        setAppState({loading: false, categorias: categorias});
      });
  }, [setAppState]);

  return (
    <div className='categorias pt-72 sm:pt-56'>
      <h1 className='font-montserrat text-4xl text-center pt-10'>Todas las categorías</h1>
      <CategoriaLoading isLoading={appState.loading} categorias={appState.categorias} />
    </div>
  );
}

export default ListaCategorias;