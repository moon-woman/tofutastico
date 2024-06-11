import React, { useState, useEffect } from 'react';
import axiosInstancia from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function PerfilEditar() {
    const navigate = useNavigate();
    const { alias } = useParams();
    const datosFormularioInicial = {
        nombre: '',
        apellido_primero: '',
        apellido_segundo: '',
        fecha_nacimiento: '',
        descripcion: '',
    };

    const [datosFormulario, actualizarDatos] = useState(datosFormularioInicial);
    const [id_usuario, setIdUsuario] = useState(null);


    useEffect(() => {
        axiosInstancia.get(`profile/${alias}/`).then((resp) => {
            // Extraer el id_usuario de la respuesta de la API
            const { id_usuario, nombre, apellido_primero, apellido_segundo, fecha_nacimiento, descripcion } = resp.data;
            
            // Actualizar el estado con los datos obtenidos
            actualizarDatos({
                nombre,
                apellido_primero,
                apellido_segundo,
                fecha_nacimiento,
                descripcion,
            });
    
            
            setIdUsuario(id_usuario);
        });
    }, [alias]);
    

    const cambios = (e) => {
        actualizarDatos({
			...datosFormulario,
            [e.target.name]: e.target.value,
		});
    };

    const enviar = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', datosFormulario.nombre);
        formData.append('apellido_primero', datosFormulario.apellido_primero);
        formData.append('apellido_segundo', datosFormulario.apellido_segundo);
        formData.append('fecha_nacimiento', datosFormulario.fecha_nacimiento);
        formData.append('descripcion', datosFormulario.descripcion);

        await axiosInstancia.put(`/profile/${id_usuario}/edit/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        navigate(`/profile/${alias}/`);
    };

    return (
        <React.Fragment>
            <section className='flex items-center justify-center pt-72 pb-20'>
                <div className="w-2/3 lg:w-1/2 border border-tofu-pink rounded-xl shadow-2xl overflow-hidden p-8 space-y-8">
                    <div className='relative'>
                        <h2 className="text-center text-4xl font-extrabold text-black font-montserrat">
                            Editar información del usuario "{alias}"
                        </h2>
                    </div>
                    <form noValidate className="space-y-6" onSubmit={enviar}>
                        <div className="relative">
                            <input
                                placeholder="Nombre"
                                className="peer h-10 w-full border-b-2 border-tofu-pink text-black bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink"
                                required
                                id="nombre"
                                name="nombre"
                                autoComplete='nombre'
                                value={datosFormulario.nombre}
                                onChange={cambios}
                            />
                            <label className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm" htmlFor="nombre">Nombre</label>
                        </div>
                        <div className="relative">
                            <input
                                placeholder="Primer apellido"
                                className="peer h-10 w-full border-b-2 border-tofu-pink text-black bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink"
                                required
                                id="apellido_primero"
                                name="apellido_primero"
                                autoComplete='apellido_primero'
                                value={datosFormulario.apellido_primero}
                                onChange={cambios}
                            />
                            <label className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm" htmlFor="apellido_primero">Primer apellido</label>
                        </div>
                        <div className="relative pb-5">
                            <input
                                placeholder="Segundo apellido"
                                className="peer h-10 w-full border-b-2 border-tofu-pink text-black bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink"
                                required
                                id="apellido_segundo"
                                name="apellido_segundo"
                                autoComplete="apellido_segundo"
                                value={datosFormulario.apellido_segundo}
                                onChange={cambios}
                            />
                            <label className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm" htmlFor="apellido_segundo">Segundo apellido</label>
                        </div>
                        <div className="relative">
                            <input
                                type='date'
                                placeholder="Fecha de nacimiento"
                                className="peer resize-none h-10 w-full border-b-2 border-tofu-pink text-black bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink"
                                required
                                id="fecha_nacimiento"
                                name="fecha_nacimiento"
                                autoComplete="fecha_nacimiento"
                                value={datosFormulario.fecha_nacimiento}
                                onChange={cambios}
                            />
                            <label className="absolute left-0 -top-7 text-black text-base transition-all" htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
                        </div>
                        <div className="relative">
                            <textarea
                                placeholder="Sobre ti"
                                className="peer resize-none h-44 w-full border-b-2 border-tofu-pink text-black bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink"
                                required
                                id="descripcion"
                                name="descripcion"
                                autoComplete="descripcion"
                                value={datosFormulario.descripcion}
                                onChange={cambios}
                            ></textarea>
                            <label className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm" htmlFor="descripcion">Sobre ti</label>
                        </div>
                        <button className="w-full py-2 px-4 bg-tofu-pink border border-tofu-pink hover:bg-transparent rounded-md shadow-lg text-black font-semibold transition duration-200 uppercase font-nunito hover:text-tofu-pink" type="submit">Actualizar</button>
                    </form>
                </div>
            </section>
        </React.Fragment>
    );
}
