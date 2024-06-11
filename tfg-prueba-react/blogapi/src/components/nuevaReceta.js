import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstancia from '../axios';

const NuevaReceta = () => {
    const history = useNavigate();

    function slugify(string) {
        const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
        const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
        const p = new RegExp(a.split('').join('|'), 'g');

        return string
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
            .replace(/&/g, '-and-') // Replace & with 'and'
            .replace(/[^\w\-]+/g, '') // Remove all non-word characters
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text
    }

    const datosIniciales = {
        titulo: '',
        slug: '',
        extracto: '',
        ingredientes: '',
        contenido: '',
        imagen: null,
    };

    const [datosForm, actualizarData] = useState(datosIniciales);
    const [imagenPrevia, setImagenPrevia] = useState(null);
    const [categorias, setCategorias] = useState(null);


    useEffect(() => {
        axiosInstancia.get(`categories/`).then((resp) => {
            setCategorias(resp.data);
        });
    }, []);

    const cambios = (e) => {
        const { name, value } = e.target;
        if (name === 'imagen') {
            const file = e.target.files[0];
            actualizarData(prevState => ({
                ...prevState,
                imagen: file,
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagenPrevia(reader.result);
            };
            reader.readAsDataURL(file);
        } else if (name === 'titulo') {
            actualizarData(prevState => ({
                ...prevState,
                [name]: value,
                slug: slugify(value),
            }));
        } else {
            actualizarData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const enviar = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', datosForm.titulo);
        formData.append('excerpt', datosForm.extracto);
        formData.append('ingredients', datosForm.ingredientes);
        formData.append('content', datosForm.contenido);
        formData.append('slug', datosForm.slug);
        formData.append('category', datosForm.categoria)
        if (datosForm.imagen) {
            formData.append('photo', datosForm.imagen);
        }
        axiosInstancia
            .post('post/crear/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                history('/post/' + res.data.slug + '/');
            });
    };

    return (
        <React.Fragment>
            <section className='flex items-center justify-center pt-72 pb-20'>
                <div style={{animation: "slideInFromLeft 1s ease-out"}} className="w-2/3 lg:w-1/2 border-2 border-tofu-green bg-transparent rounded-xl shadow-2xl overflow-hidden p-8 space-y-8">
                    <div className='relative'>
                        <h2 style={{animation: "appear 2s ease-out"}} className="text-center text-4xl font-extrabold text-tofu-green font-montserrat">¡Crea una nueva receta!</h2>
                        <img src="/images/formulario.png" alt="" className='absolute w-44 bottom-0 -top-4 -right-16'/> 
                    </div>
                    <form noValidate className="space-y-6" onSubmit={enviar}>
                        <div className="relative">
                            <input
                                placeholder="Título"
                                className="peer h-10 w-full border-b-2 border-tofu-green text-black bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink"
                                required
                                id="titulo"
                                name="titulo"
                                autoComplete='titulo'
                                value={datosForm.titulo}
                                onChange={cambios}
                            />
                            <label className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm" htmlFor="titulo">Título</label>
                        </div>
                        <div className="relative">
                            <input
                                readOnly
                                placeholder="Slug"
                                className="peer h-10 w-full border-b-2 border-tofu-green text-black bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink"
                                required
                                id="slug"
                                name="slug"
                                autoComplete='slug'
                                value={datosForm.slug}
                                onChange={cambios}
                            />
                            <label className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm" htmlFor="slug">Slug</label>
                        </div>
                        <div className="relative">
                            <select
                                className="peer h-10 w-full border-b-2 border-tofu-green text-black bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink"
                                required
                                id="categoria"
                                name="categoria"
                                autoComplete='categoria'
                                onChange={cambios} 
                                value={datosForm.categoria}
                            >
                                <option value="">Selecciona una categoría</option>
                                {categorias && categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='relative py-2'>
                            <input
                                type='file'
                                placeholder="Imagen"
                                className="peer h-10 w-full border-b-2 border-tofu-green text-black bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink py-2"
                                id="imagen"
                                name="imagen"
                                onChange={cambios}
                            />
                            <label className="text-black text-base transition-all peer-placeholder-shown:text-base absolute left-0 -top-4" htmlFor="imagen">Imagen</label>
                        </div>
                        {imagenPrevia && (
                            <img src={imagenPrevia} alt="Vista previa" className='w-44 h-44 object-cover' />
                        )}
                        <div className="relative">
                            <input
                                placeholder="Extracto"
                                className="peer h-20 w-full border-b-2 border-tofu-green text-black bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink"
                                required
                                id="extracto"
                                name="extracto"
                                autoComplete="extracto"
                                value={datosForm.extracto}
                                onChange={cambios}
                            />
                            <label className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm" htmlFor="extracto">Breve descripción</label>
                        </div>
                        <div className="relative">
                            <textarea
                                placeholder="Ingredientes"
                                className="peer resize-none h-44 w-full border-b-2 border-tofu-green text-black bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink"
                                required
                                id="ingredientes"
                                name="ingredientes"
                                autoComplete="ingredientes"
                                value={datosForm.ingredientes}
                                onChange={cambios}
                            ></textarea>
                            <label className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm" htmlFor="ingredientes">Introduce los ingredientes separados por "Intro"</label>
                        </div>
                        <div className="relative">
                            <textarea
                                placeholder="Paso a paso"
                                className="peer resize-none h-44 w-full border-b-2 border-tofu-green text-black bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink"
                                required
                                id="contenido"
                                name="contenido"
                                autoComplete="contenido"
                                value={datosForm.contenido}
                                onChange={cambios}
                            ></textarea>
                            <label className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm" htmlFor="contenido">Introduce el paso a paso separado por "Intro"</label>
                        </div>
                        <button className="w-full py-2 px-4 bg-tofu-green border border-tofu-green hover:bg-transparent rounded-md shadow-lg text-white hover:text-tofu-green font-semibold transition duration-200 uppercase font-nunito" type="submit">Crear</button>
                    </form>
                </div>
            </section>
        </React.Fragment>
    );
}

export default NuevaReceta;
