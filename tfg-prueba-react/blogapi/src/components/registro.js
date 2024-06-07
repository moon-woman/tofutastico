import React, { useState } from 'react';
import axiosInstancia from '../axios';
import { useNavigate } from 'react-router-dom';

export default function Registrarse(){
    const history = useNavigate();
    const datosFormularioInicial = Object.freeze({
        email: '',
        alias_usuario: '',
        password: '',
    });

    const [datosFormulario, actualizarDatosFormulario] = useState(datosFormularioInicial);

    const cambios = (e) => {
        actualizarDatosFormulario({
            ...datosFormulario,
            [e.target.name]: e.target.value.trim(),
        });
    }

    const enviar = (e) => {

        e.preventDefault();
        console.log(datosFormulario)
        axiosInstancia
            .post(`usuario/registro/`, {
                email: datosFormulario.email,
                alias_usuario: datosFormulario.alias_usuario,
                password: datosFormulario.password,
            })
            .then((res) => {
                history('/login');
            })

    }

    return(

        <React.Fragment>
            <section className='flex items-center justify-center py-20'>
                <div style={{animation: "slideInFromLeft 1s ease-out"}} className="max-w-md w-full bg-gradient-to-br from-tofu-blue to-white rounded-xl shadow-2xl overflow-hidden p-8 space-y-8">
                    <div className='relative'>
                        <h2 style={{animation: "appear 2s ease-out"}} className="text-center text-4xl font-extrabold text-white font-montserrat">¡Únete a nuestra comunidad!</h2>
                        <img src="/images/formulario.png" alt="" className='absolute w-44 bottom-0 -top-4 -right-16'/> 
                    </div>
                    <p style={{animation: "appear 3s ease-out"}} className="text-center text-white font-nunito text-xl">¡Regístrate!</p>
                    <form noValidate className="space-y-6">
                        <div className="relative">
                            <input
                                placeholder='E-mail'
                                className="peer h-10 w-full border-b-2 border-white text-white bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink"
                                required
                                id="email"
                                name="email"
                                type="email"
                                autoComplete='email'
                                onChange={cambios}
                            />
                            <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm" htmlFor="email">Correo Electrónico*</label>
                        </div>
                        <div className="relative">
                            <input
                                placeholder="Nombre de Usuario"
                                className="peer h-10 w-full border-b-2 border-white text-white bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink"
                                required
                                id="username"
                                name="alias_usuario"
                                autoComplete='username'
                                onChange={cambios}
                            />
                            <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm" htmlFor="password">Nombre de usuario*</label>
                        </div>
                        <div className="relative">
                            <input
                                placeholder="Contraseña"
                                className="peer h-10 w-full border-b-2 border-white text-white bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink"
                                required
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                onChange={cambios}
                            />
                            <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm" htmlFor="password">Contraseña*</label>
                        </div>
                        <div className="flex items-center justify-between ">
                            <label className="flex items-center text-sm text-black cursor-pointer">
                                <input className="form-checkbox h-4 w-4 bg-gray-800 border-gray-300 rounded cursor-pointer" type="checkbox"/>
                                <span className="ml-2">Quiero recibir novedades de la web en mi mail</span>
                            </label>
                        </div>
                        <button className="w-full py-2 px-4 bg-tofu-pink border border-tofu-pink hover:bg-transparent rounded-md shadow-lg text-white font-semibold transition duration-200 uppercase font-nunito" type="submit" onClick={enviar}>Sign Up</button>
                    </form>
                </div>
            </section>
        </React.Fragment>

    );



}