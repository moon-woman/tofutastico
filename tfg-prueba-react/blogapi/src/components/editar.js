import React, { useState, useEffect } from 'react';
import axiosInstancia from '../axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Editar() {
    const navigate = useNavigate();
    const { id } = useParams();
    const datosFormularioInicial = {
        id: '',
        titulo: '',
        slug: '',
        extracto: '',
        ingredientes: '',
        contenido: '',
        categoria: '',
        imagen: null,
    };

    const [datosFormulario, actualizarDatos] = useState(datosFormularioInicial);
    const [imagenPrevia, setImagenPrevia] = useState(null);
    const [categorias, setCategorias] = useState(null);

 
    useEffect(() => {
        axiosInstancia.get(`post/edit/postdetail/${id}/`).then((resp) => {
            actualizarDatos({
                id: id,
                titulo: resp.data.title,
                slug: resp.data.slug,
                extracto: resp.data.excerpt,
                ingredientes: resp.data.ingredients,
                contenido: resp.data.content,
                categoria: resp.data.category.id,
                imagen: null,
            });
            setImagenPrevia(resp.data.photo);
        });
        axiosInstancia.get(`categories/`).then((resp) => {
            setCategorias(resp.data);
        });
    }, [id]);

    const cambios = (e) => {
        const { name, value, files } = e.target;

        if (name === 'imagen') {
            const file = files[0];
            actualizarDatos((prevDatos) => ({
                ...prevDatos,
                [name]: file,
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagenPrevia(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            actualizarDatos((prevDatos) => ({
                ...prevDatos,
                [name]: value,
            }));
        }
    };

    const enviar = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', datosFormulario.titulo);
        formData.append('slug', datosFormulario.slug);
        formData.append('excerpt', datosFormulario.extracto);
        formData.append('ingredients', datosFormulario.ingredientes);
        formData.append('content', datosFormulario.contenido);
        formData.append('category', datosFormulario.categoria);
        if (datosFormulario.imagen) {
            formData.append('photo', datosFormulario.imagen);
        }

        await axiosInstancia.put(`/post/edit/${id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        navigate(`/post/${datosFormulario.slug}/`);
    };

    return (
        <React.Fragment>
            <section className='flex items-center justify-center pt-72 pb-20'>
                <div className="w-2/3 lg:w-1/2 border border-tofu-blue rounded-xl shadow-2xl overflow-hidden p-8 space-y-8">
                    <div className='relative'>
                        <h2 className="text-center text-4xl font-extrabold text-black font-montserrat">
                            Editar la receta "{datosFormulario.titulo}"
                        </h2>
                        {imagenPrevia && (
                            <img src={imagenPrevia} alt="Vista previa" className='w-44 h-44 object-cover' />
                        )}
                    </div>
                    <form noValidate className="space-y-6" onSubmit={enviar}>
                        <div className="relative">
                            <input
                                placeholder="Título"
                                className="peer h-10 w-full border-b-2 border-tofu-blue text-black bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink"
                                required
                                id="titulo"
                                name="titulo"
                                autoComplete='titulo'
                                value={datosFormulario.titulo}
                                onChange={cambios}
                            />
                            <label className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm" htmlFor="titulo">Título</label>
                        </div>
                        <div className="relative">
                            <input
                                placeholder="Slug"
                                className="peer h-10 w-full border-b-2 border-tofu-blue text-black bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink"
                                required
                                id="slug"
                                name="slug"
                                autoComplete='slug'
                                value={datosFormulario.slug}
                                onChange={cambios}
                            />
                            <label className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm" htmlFor="slug">Slug</label>
                        </div>
                        <div className="relative">
                            <select
                                className="peer h-10 w-full border-b-2 border-tofu-blue text-black bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink"
                                required
                                id="categoria"
                                name="categoria"
                                autoComplete='categoria'
                                onChange={cambios} 
                                value={datosFormulario.categoria}
                                defaultValue={datosFormulario.categoria}
                            >
                                <option value="">Selecciona una categoría</option>
                                {categorias && categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="relative">
                            <input
                                type='file'
                                placeholder="Imagen"
                                className="peer py-2 h-10 w-full border-b-2 border-tofu-blue text-black bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink"
                                id="imagen"
                                name="imagen"
                                onChange={cambios}
                            />
                            <label className="absolute left-0 -top-3.5 text-base transition-all text-black" htmlFor="imagen">Imagen</label>
                        </div>
                        <div className="relative">
                            <textarea
                                placeholder="Extracto"
                                className="peer h-20 w-full border-b-2 border-tofu-blue text-black bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink"
                                required
                                id="extracto"
                                name="extracto"
                                autoComplete="extracto"
                                value={datosFormulario.extracto}
                                onChange={cambios}
                            ></textarea>
                            <label className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm" htmlFor="extracto">Breve descripción</label>
                        </div>
                        <div className="relative">
                            <textarea
                                placeholder="Ingredientes"
                                className="peer resize-none h-44 w-full border-b-2 border-tofu-blue text-black bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink"
                                required
                                id="ingredientes"
                                name="ingredientes"
                                autoComplete="ingredientes"
                                value={datosFormulario.ingredientes}
                                onChange={cambios}
                            ></textarea>
                            <label className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm" htmlFor="ingredientes">Introduce los ingredientes separados por "Intro"</label>
                        </div>
                        <div className="relative">
                            <textarea
                                placeholder="Paso a paso"
                                className="peer resize-none h-44 w-full border-b-2 border-tofu-blue text-black bg-transparent placeholder-transparent focus:outline-none focus:border-tofu-pink"
                                required
                                id="contenido"
                                name="contenido"
                                autoComplete="contenido"
                                value={datosFormulario.contenido}
                                onChange={cambios}
                            ></textarea>
                            <label className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm" htmlFor="contenido">Introduce el paso a paso separado por "Intro"</label>
                        </div>
                        <button className="w-full py-2 px-4 bg-tofu-blue border border-tofu-blue hover:bg-transparent rounded-md shadow-lg text-black font-semibold transition duration-200 uppercase font-nunito hover:text-tofu-blue" type="submit">Actualizar</button>
                    </form>
                </div>
            </section>
        </React.Fragment>
    );
}
