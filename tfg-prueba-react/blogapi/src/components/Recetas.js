import React from 'react';
import { NavLink } from 'react-router-dom';



const Recetas = (props) => {
    const { recetas, fromUser } = props;
   

    if(!recetas || recetas.length === 0) return <p>No hay recetas</p>;

    return (
        <React.Fragment>
            <div className='flex flex-wrap justify-center items-center gap-10 py-20'>
                {recetas.map((receta) => {
                    return (
                        <div key={receta.id} className='flex flex-col items-start justify-start gap-5 w-1/4 max-h-[30rem] min-h-[30rem]'>
                            <div style={{backgroundImage: `url(${receta.photo})`}} className='w-full h-72 bg-center bg-cover rounded-3xl'></div>
                            <NavLink to={"/post/" + receta.slug + "/"}>
                                <h1 className="text-2xl font-montserrat text-tofu-pink font-bold">{receta.title}</h1>
                            </NavLink>
                            <p className='font-nunito text-lg text-black'>{receta.excerpt.substring(0, 100)}...</p>
                            {
                                fromUser && (
                                    <>
                                        <div className='flex flex-row items-start justify-start gap-10 py-10'>
                                            <NavLink to={`/post/editar/${receta.id}`}>
                                                <button type="button" className="bg-white border border-tofu-pink text-center w-48 rounded-2xl h-14 relative font-nunito text-black text-xl font-semibold group">
                                                    <div class="bg-tofu-pink rounded-xl h-14 w-1/4 flex items-center justify-center absolute left-0 top-0 group-hover:w-48 z-10 duration-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                        </svg>
                                                    </div>
                                                    <p class="translate-x-4">Editar</p>
                                                </button>

                                            </NavLink>
                                            <NavLink to={`/post/eliminar/${receta.id}`}>
                                                <button type="button" className="bg-white border border-tofu-pink text-center w-48 rounded-2xl h-14 relative font-nunito text-black text-xl font-semibold group">
                                                    <div class="bg-tofu-pink rounded-xl h-14 w-1/4 flex items-center justify-center absolute left-0 top-0 group-hover:w-48 z-10 duration-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>
                                                    </div>
                                                    <p class="translate-x-4">Eliminar</p>
                                                </button>

                                            </NavLink>
                                        </div>
                                    </>
                                )
                            }
                            
                        </div>

                    );

                })}
            </div>
        </React.Fragment>
    );
}

export default Recetas;