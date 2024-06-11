import React, { useState, useEffect } from 'react';
import axiosInstancia from '../axios';
import { useParams } from 'react-router-dom';
import RecetaLoadingComponent from './RecetaLoading';
import Recetas from './Recetas';
import { NavLink } from 'react-router-dom';



const Perfil = () => {
    const { alias } = useParams();
    const [data, setData] = useState({ perfil: null });
    const [loading, setLoading] = useState(true);
    const RecetaLoading = RecetaLoadingComponent(Recetas);
    const [appState, setAppState] = useState({
        loading: false,
        recetas: null,
    });

    useEffect(() => {
        axiosInstancia.get("profile/" + alias + "/").then((respuesta) => {
            setData({ perfil: respuesta.data });
            setLoading(false);
            setAppState({loading: true});
            const apiUrl = 'http://127.0.0.1:8000/api/post/?alias_usuario=' + alias;
            fetch(apiUrl)
            .then((data) => data.json())
            .then((recetas) => {
                setAppState({loading: false, recetas: recetas});
            });
        });
    }, [alias, setAppState]);


    if (loading) {
        return <div>Loading...</div>;
    }

    const nacimiento = new Date(data.perfil.fecha_nacimiento);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const fecha = nacimiento.toLocaleDateString(undefined, options);

    return (
        <React.Fragment>
            <div className='flex flex-col justify-center items-center gap-10 pt-72 pb-20 px-10 xl:px-28'>
                <h1 className='font-montserrat text-3xl'>¡Este es tu perfil, <span className='text-tofu-green font-bold'>{data.perfil.alias_usuario}</span>!</h1>
                <div className='w-full xl:w-3/4 border-t border-b border-tofu-green flex flex-row items-center justify-between'>
                    <div className='flex flex-row items-center justify-start gap-10'>
                        <img src={data.perfil.foto_usuario} alt="Cat in a jacket"/>
                        <div className='flex flex-col items-start justify-start gap-5'>
                            <p className='text-lg font-montserrat font-semibold'>Email: <span className='font-nunito font-normal'>{data.perfil.email}</span></p>
                            <p className='text-lg font-montserrat font-semibold'>Nombre: <span className='font-nunito font-normal'>{data.perfil.nombre}</span></p>
                            <p className='text-lg font-montserrat font-semibold'>Apellidos: <span className='font-nunito font-normal'>{data.perfil.apellido_primero} {data.perfil.apellido_segundo}</span></p>
                            <p className='text-lg font-montserrat font-semibold'>Fecha de nacimiento: <span className='font-nunito font-normal'>{fecha}</span> </p>
                            <p className='text-lg font-montserrat font-semibold'>Sobre ti: <span className='font-nunito font-normal'>{data.perfil.descripcion}</span> </p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-10'>
                        <NavLink to="/post/crear/">
                            <button type="button" className="bg-white border border-tofu-green text-center w-40 2xl:w-48 rounded-2xl h-10 2xl:h-14 relative font-nunito text-black text-lg 2xl:text-xl font-semibold group">
                                <div class="bg-tofu-green rounded-xl h-10 2xl:h-14 w-1/4 flex items-center justify-center absolute left-0 top-0 group-hover:w-40 2xl:group-hover:w-48 z-10 duration-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                                <p class="translate-x-4">Crear receta</p>
                            </button>

                        </NavLink>
                        <NavLink to={"/profile/" + data.perfil.alias_usuario + "/editar/"}>
                            <button type="button" className="bg-white border border-tofu-blue text-center w-40 2xl:w-48 rounded-2xl h-10 2xl:h-14 relative font-nunito text-black text-lg 2xl:text-xl font-semibold group">
                                <div class="bg-tofu-blue rounded-xl h-10 2xl:h-14 w-1/4 flex items-center justify-center absolute left-0 top-0 group-hover:w-40 2xl:group-hover:w-48 z-10 duration-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                                <p class="translate-x-4">Editar perfil</p>
                            </button>

                        </NavLink>
                    </div>
                </div>

                <div className='w-full h-full'>
                    <h1 className='font-montserrat text-4xl text-center pt-10'>Tus recetas</h1>
                    <RecetaLoading isLoading={appState.loading} recetas={appState.recetas} fromUser={true} />
                </div>
            </div>
        </React.Fragment>
    );
}

export default Perfil;