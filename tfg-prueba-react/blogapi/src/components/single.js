import React, { useState, useEffect } from 'react';
import axiosInstancia from '../axios';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function Receta() {
    const { slug } = useParams();
    const [data, setData] = useState({ posts: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstancia.get("post/" + slug + "/").then((respuesta) => {
            setData({ posts: respuesta.data });
            setLoading(false);
        });
    }, [slug]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const publishedDate = new Date(data.posts.published);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const fecha = publishedDate.toLocaleDateString(undefined, options);

    return (
        <React.Fragment>
            <section className='pt-80 sm:pt-72 pb-20 px-10 lg:px-20 xl:px-32 2xl:px-52 flex flex-col justify-center gap-10'>
                <div className='flex flex-col items-center justify-center gap-5 py-5'>
                    <h1 className='font-montserrat text-3xl text-center sm:text-6xl text-tofu-pink font-semibold'>{data.posts.title}</h1>
                    <p className='font-nunito text-center text-lg sm:text-2xl'>{data.posts.excerpt}</p>
                </div>

                <div style={{ backgroundImage: `url(${data.posts.photo})` }} className='w-full sm:w-1/2 h-96 bg-center bg-cover rounded-3xl m-auto'></div>

                <div className='border-t border-b border-tofu-green relative flex flex-col sm:flex-row items-start justify-start gap-10 xl:gap-20 py-10'>
                    <div style={{backgroundImage:'url(/images/single-receta.png)'}} className='w-48 h-36 bg-center bg-cover absolute -right-12 -bottom-6'></div>
                    <div className='flex flex-row items-center justify-center gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 stroke-tofu-pink">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                        </svg>
                        <p className='font-semibold font-montserrat text-base text-tofu-pink'>Categoría: <span className='font-normal font-nunito'>{data.posts.category.name}</span></p>
                    </div>

                    <div className='flex flex-row items-center justify-center gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 stroke-tofu-pink">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <p className='font-semibold font-montserrat text-base text-tofu-pink'>Usuario: <span className='font-normal font-nunito'>{data.posts.author.alias_usuario}</span></p>
                    </div>

                    <div className='flex flex-row items-center justify-center gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 stroke-tofu-pink">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>

                        

                        <p className='font-semibold font-montserrat text-base text-tofu-pink'>Fecha de publicación: <span className='font-normal font-nunito'>{fecha}</span></p>
                    </div>

                </div>

                <div className='flex flex-col items-center justify-start'>
                    <h1 className='font-montserrat text-4xl text-tofu-blue font-semibold py-5'>Ingredientes:</h1>
                    <ul className='font-nunito text-lg list-disc w-full sm:w-1/2'>
                        {data.posts.ingredients.split('\n').map((ingredient, index) => (
                            <li key={index} className='py-1'>{ingredient}</li>
                        ))}
                    </ul>
                </div>

                

                <div className='flex flex-col items-center justify-start'>
                    <h1 className='font-montserrat text-4xl text-tofu-blue font-semibold py-5'>Paso a paso:</h1>
                    <ul className='font-nunito text-lg list-decimal w-full sm:w-1/2'>
                        {data.posts.content.split('\n').map((cont, index) => (
                            <li key={index} className='py-1'>{cont}</li>
                        ))}
                    </ul>
                </div>

                <NavLink to={`/posts`}>
                    <button type="button" className="bg-white border border-tofu-pink text-center w-56 rounded-3xl h-14 relative font-nunito text-black text-xl font-semibold group m-auto">
                        <div class="bg-tofu-pink rounded-3xl h-14 w-1/4 flex items-center justify-center absolute left-0 top-0 group-hover:w-56 z-10 duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </div>
                        <p class="translate-x-6">Ver más recetas</p>
                    </button> 
                </NavLink>
            </section>
        </React.Fragment>
    );
}
