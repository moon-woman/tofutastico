import React, { useState, useEffect } from 'react';
import axiosInstancia from '../axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Eliminar() {
    const history = useNavigate();
    const { id } = useParams();
    const username = localStorage.getItem('logged_username')

    const enviar = (e) => {
        e.preventDefault();
        axiosInstancia
            .delete('/post/delete/' + id + "/")
            .catch(function (error){
                if(error.response){
                    console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
                }
            })
            .then(function () {
                history('/profile/' + username + "/");
                window.location.reload();
            })
    }

    return (
        <React.Fragment>
            <section className='flex flex-col items-center justify-center py-28 gap-10'>
                <h1 className='font-montserrat text-red-700 text-4xl py-10 font-bold'>¿Deseas borrar esta receta?</h1>
                <button onClick={enviar} className='text-white text-xl py-5 px-10 font-nunito bg-red-700 hover:scale-125 flex flex-row items-center justify-center rounded-3xl gap-5 transition duration-300 ease-in-out uppercase'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10 stroke-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    Eliminar
                </button>
            </section>
        </React.Fragment>
    );
}