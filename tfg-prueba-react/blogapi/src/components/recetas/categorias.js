import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Categorias = (props) => {
    const { categorias } = props;
    const categoriasRef = useRef([]);

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

        categoriasRef.current.forEach((elem) => {
            if (elem) {
                ocultar(elem);

                ScrollTrigger.create({
                    trigger: elem,
                    start: "top 80%",
                    markers: false,
                    onEnter: () => animarDesde(elem),
                    onEnterBack: () => animarDesde(elem, -1),
                    onLeave: () => ocultar(elem),
                });
            }
        });
    }, [categorias]);

    if (!categorias || categorias.length === 0) return <p>No hay categorías</p>;

    return (
        <React.Fragment>
            <div className='flex flex-col sm:flex-wrap justify-center items-center gap-10 py-20'>
                {categorias.map((categoria, index) => {
                    return (
                        <div
                            key={categoria.id}
                            ref={el => categoriasRef.current[index] = el}
                            className={`flex flex-col items-center justify-center gap-5 w-full sm:w-1/4 max-h-96 ${index % 2 === 0 ? 'derecha' : 'izquierda'}`}
                        >
                            <div style={{ backgroundImage: `url(${categoria.random_photo_url})` }} className='w-full h-72 bg-center bg-cover rounded-3xl'></div>
                            <NavLink to={"/categoria/" + categoria.name + "/posts"}>
                                <h1 className="text-2xl font-montserrat text-tofu-pink font-bold text-center">{categoria.name}</h1>
                            </NavLink>
                        </div>
                    );
                })}
            </div>
        </React.Fragment>
    );
}

export default Categorias;
