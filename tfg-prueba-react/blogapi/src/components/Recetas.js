import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Recetas = (props) => {
    const { recetas, fromUser } = props;
    const recetasRef = useRef([]);

    useEffect(() => {
        function animarDesde(elem, direccion = 1) {
            const numeroDefault = 100;

            let x = 0, y = direccion * numeroDefault;

            if (elem.classList.contains("izquierda")) {
                y = -numeroDefault;
                x = 0;
            } else if (elem.classList.contains("derecha")) {
                y = numeroDefault;
                x = 0;
            }

            elem.style.transform = `translate(${x}px, ${y}px)`;
            elem.style.opacity = "0";

            gsap.fromTo(elem, { x, y, autoAlpha: 0 }, {
                duration: 1.25,
                x: 0,
                y: 0,
                autoAlpha: 1,
                ease: "expo",
                overwrite: "auto"
            });
        }

        function ocultar(elem) {
            gsap.set(elem, { autoAlpha: 0 });
        }

        recetasRef.current.forEach((elem) => {
            if (elem) {
                ocultar(elem);

                ScrollTrigger.create({
                    trigger: elem,
                    start: "top 80%", // Ajusta según sea necesario
                    markers: false,
                    onEnter: () => animarDesde(elem),
                    onEnterBack: () => animarDesde(elem, -1),
                    onLeave: () => ocultar(elem),
                });
            }
        });
    }, [recetas]);

    if (!recetas || recetas.length === 0) return <p className='font-nunito text-2xl text-center py-10'>No hay recetas aún</p>;

    return (
        <React.Fragment>
            <div className='flex flex-col sm:flex-wrap justify-center items-center gap-10 py-20'>
                {recetas.map((receta, index) => {
                    return (
                        <div
                            key={receta.id}
                            ref={el => recetasRef.current[index] = el}
                            className={`flex flex-col items-start justify-start gap-5 w-1/2 sm:w-1/3 max-h-[30rem] min-h-[30rem] ${index % 2 === 0 ? 'derecha' : 'izquierda'} `}
                        >
                            
                            <div style={{ backgroundImage: `url(${receta.photo})` }} className='w-full h-72 bg-center bg-cover rounded-3xl'></div>
                            <NavLink to={"/post/" + receta.slug + "/"}>
                                <h1 className="text-2xl font-montserrat text-tofu-pink font-bold">{receta.title}</h1>
                            </NavLink>
                            <p className='font-nunito text-lg text-black'>{receta.excerpt.substring(0, 50)}...</p>
                            {
                                fromUser && (
                                    <div className='flex flex-col lg:flex-row items-center justify-center gap-5 py-10'>
                                        <NavLink to={`/post/editar/${receta.id}`}>
                                            <button type="button" className="bg-white border border-tofu-pink text-center w-40 rounded-2xl h-10 relative font-nunito text-black text-xl font-semibold group">
                                                <div className="bg-tofu-pink rounded-xl h-10 w-1/4 flex items-center justify-center absolute left-0 top-0 group-hover:w-40 z-10 duration-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                    </svg>
                                                </div>
                                                <p className="translate-x-4">Editar</p>
                                            </button>
                                        </NavLink>
                                        <NavLink to={`/post/eliminar/${receta.id}`}>
                                            <button type="button" className="bg-white border border-tofu-pink text-center w-40 rounded-2xl h-10 relative font-nunito text-black text-xl font-semibold group">
                                                <div className="bg-tofu-pink rounded-xl h-10 w-1/4 flex items-center justify-center absolute left-0 top-0 group-hover:w-40 z-10 duration-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </div>
                                                <p className="translate-x-4">Eliminar</p>
                                            </button>
                                        </NavLink>
                                    </div>
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
