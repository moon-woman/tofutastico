import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstancia from '../../axios';
import { NavLink } from 'react-router-dom';

const PostPorCategoria = () => {
    const { nombre_categoria } = useParams(); 
    const [recetas, setRecetas] = useState([]);

    useEffect(() => {
        axiosInstancia.get(`categories/${nombre_categoria}/`).then((resp) => {
            setRecetas(resp.data);
        });
        
    }, [nombre_categoria]);

    return (
        <React.Fragment>
            <div className='pb-20 pt-72'>
                <h1 className='font-montserrat text-4xl text-center pt-10'>Todas las recetas de la categoría "{nombre_categoria}"</h1>
                <div className='flex flex-wrap justify-center items-center gap-10 py-20'>
                    {recetas.map((receta) => {
                        return (
                            <div key={receta.id} className='flex flex-col items-start justify-start gap-5 w-2/3 sm:w-1/4 max-h-[30rem] min-h-[30rem]'>
                                <div style={{backgroundImage: `url(${receta.photo})`}} className='w-full h-72 bg-center bg-cover rounded-3xl'></div>
                                <NavLink to={"/post/" + receta.slug + "/"}>
                                    <h1 className="text-2xl font-montserrat text-tofu-pink font-bold">{receta.title}</h1>
                                </NavLink>
                                <p className='font-nunito text-lg text-black'>{receta.excerpt.substring(0, 100)}...</p>
                            </div>

                        );

                    })}
                </div>
            </div>
        </React.Fragment>
    );
}

export default PostPorCategoria;
