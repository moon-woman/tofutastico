import React, { useState, useEffect } from 'react';
import axiosInstancia from '../axios';
import { NavLink } from 'react-router-dom';

const Busqueda = () => {
    const searchQuery = new URLSearchParams(window.location.search).get("search") || "sin término de búsqueda";
    const search = 'search';
	const [appState, setAppState] = useState({
		search: '',
		posts: [],
	});

	useEffect(() => {
		axiosInstancia.get(search + '/' + window.location.search).then((res) => {
			const allPosts = res.data;
			setAppState({ posts: allPosts });
			console.log(res.data);
		});
	}, [setAppState]);

    return (
        <React.Fragment>
            <section className='py-10 flex flex-col items-center justify-center'>
                
                <h1 className='text-4xl py-10 font-montserrat text-tofu-green font-semibold text-center'>Recetas que coindicen con "{searchQuery}"</h1>
                <div className='flex flex-wrap justify-center items-center gap-10 py-20'>
                    {appState.posts.map((receta) => {
                        return (
                            <div key={receta.id} className='flex flex-col items-start justify-start gap-5 w-1/2'>
                                <div style={{backgroundImage: `url(${receta.photo})`}} className='w-full h-72 bg-center bg-cover rounded-3xl'></div>
                                <NavLink to={"/post/" + receta.slug + "/"}>
                                    <h1 className="text-2xl font-montserrat text-tofu-pink font-bold">{receta.title}</h1>
                                </NavLink>
                                <p className='font-nunito text-lg text-black'>{receta.excerpt.substring(0, 100)}...</p>
                            </div>

                        );

                    })}
                </div>
                <NavLink to="/">
                    <button type="button" className="bg-white text-center w-48 rounded-3xl h-14 relative font-nunito text-black text-xl font-semibold group ">
                        <div class="bg-tofu-green rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
                            <svg width="25px" height="25px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#000000" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path>
                                <path fill="#000000" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path>
                            </svg>
                        </div>
                        <p class="translate-x-2">Volver</p>
                    </button>
                </NavLink>
            </section>
            
        </React.Fragment>
    );


}

export default Busqueda;