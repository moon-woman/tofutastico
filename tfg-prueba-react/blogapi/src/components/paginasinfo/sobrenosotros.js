import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, A11y, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { NavLink } from "react-router-dom";

function SobreNosotros(){

    return (
        <React.Fragment>
            <section className="flex flex-col items-start justify-start gap-10 pt-72 pb-20">
                <div className="relative flex items-center justify-center py-10 self-center">
                    <img src="../images/govegan.png" alt="Hombrecito con una remolacha" className="absolute right-72 -bottom-20 w-56 2xl:w-72"/>
                    <h1 className='font-montserrat text-6xl text-center pt-10 text-tofu-green font-bold'>Go vegan!</h1>
                </div>
                <div className="flex flex-row items-start justify-between gap-5 lg:gap-20 py-20 2xl:py-40 px-20 2xl:px-44">
                    <div className="flex flex-col items-start justify-start gap-5 w-1/2">
                        <h2 className='font-montserrat text-2xl text-center text-tofu-pink font-bold'>Sin duda, hay muchos motivos para adoptar un estilo de vida vegano...</h2>
                        <div className="font-nunito text-lg flex flex-col items-start justify-start gap-2">
                            <p>Hace siete años, la autora de esta página tomó la decisión de no volver a consumir ningún producto de origen animal.</p>
                            <p>Desde entonces, ha sido todo un viaje.</p>
                            <p>Los principales motivos que me movieron a llevar un estilo de vida vegano fueron los animales. Después de muchos años estudiando teorías éticas, moviéndome por los colectivos sociales de Granada y empapándome de cada informe o documental que algunos grupos activistas sacaban a la luz, decidí formar parte del movimiento.</p>
                            <p>Mi activismo se basa en mi forma de vida, fuera de ella participo de las acciones animalistas que me son posibles, pero principalmente procuro que tanto mi ropa, como mi comida, como los productos de higiene y belleza que utilizo no hayan sido testados en animales y no tengan ningún componente de origen animal.</p>
                        </div>
                    </div>
                    <Swiper
                        className="w-96 lg:w-[40rem]"
                        modules={[A11y, Autoplay, EffectFade]}
                        autoplay
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        loop={true}
                        spaceBetween={50}
                        slidesPerView={1}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        >
                        <SwiperSlide><img src="../images/Hero1.jpg" alt="Cat in a jacket" className="rounded-3xl"/></SwiperSlide>
                        <SwiperSlide><img src="../images/Hero2.jpg" alt="Cat in a jacket" className="rounded-3xl"/></SwiperSlide>
                        <SwiperSlide><img src="../images/Hero3.jpg" alt="Cat in a jacket" className="rounded-3xl"/></SwiperSlide>
                        <SwiperSlide><img src="../images/Hero4.jpg" alt="Cat in a jacket" className="rounded-3xl"/></SwiperSlide>
                    </Swiper>

                </div>
                <div className="flex flex-col items-start justify-start gap-10 px-20 lg:px-44">
                    <div className="flex flex-row items-center justify-center">
                        <h2 className='font-montserrat text-2xl text-center text-tofu-pink font-bold'>Tips para transicionar al veganismo:</h2>
                        <img src="../images/tips.png" alt="Girl eating" className="w-40"/>
                    </div>
                    <ul className="font-nunito text-lg px-10 list-disc">
                        <li><span className="font-semibold text-xl">Empezar reduciendo el consumo de productos de origen animal de forma gradual.</span> No hay que hacer las cosas deprisa o podemos vernos sobrepasados o poner en riesgo nuestra salud. Nuestra cultura tiene como plato principal una carne o un pescado, así que primero debemos empezar a aprender a sustituirlo por otros alimentos ricos en proteína que sacien y puedan ser nuestros platos principales.</li>
                        <li><span className="font-semibold text-xl">Informarte sobre qué alimentos vegetales naturales aportan proteína.</span> No todo es alimentarse de ultraprocesados, contamos con muchos alimentos, como las legumbres o la soja, que no solo tienen un precio muy asequible, sino que, además, aportan mucha proteína y tienen un componente saciante.</li>
                        <li><span className="font-semibold text-xl">Rodéate de personas vegetarianas o veganas.</span> Así será mucho más fácil elegir sitios donde salir a comer y que tengan opciones para ti.</li>
                        <li><span className="font-semibold text-xl">Infórmate de la dosis actualizada necesaria de B12.</span> El Institute of Medicine y la Autoridad Europea de Seguridad Alimentaria van actualizando sus datos conforme a estudios científicos sobre cuánta dosis de B12 necesitamos. Compra tu suplemento y no olvides tomarlo todas las semanas.</li>
                        <li><span className="font-semibold text-xl">Consulta a un nutricionista si te ves muy perdido.</span> Alimentarse bien es algo que no todo el mundo sabe, y no por comer carne y pescado u otros productos de origen animal ya estamos alimentándonos bien. Todas las personas deberíamos aprender a comer para hacer platos saludables y variados. Antes había muy poca información sobre el veganismo, ahora circula mucha información nutricional por la red, pero siempre es mejor, ante la duda, consultar a un profesional.</li>
                        <li><span className="font-semibold text-xl">Ten paciencia.</span> Cambiar radicalmente su alimentación no es fácil a nivel emocional ni cultural. Por eso es importante hacerlo poco a poco.</li>
                    </ul>

                </div>
                <div className="flex flex-col items-start justify-start gap-10 px-20 lg:px-44 relative">
                    <h2 className='font-montserrat text-2xl text-center text-tofu-pink font-bold'>Herramientas informativas:</h2>
                    <ul className="font-nunito text-lg px-10 list-disc">
                        <li><span className="font-semibold text-xl">Listado de marcas Cruelty free:</span> <NavLink to="https://www.crueltyfreekitty.com/" className="underline">Cruelty Free Kitty</NavLink></li>
                        <li><span className="font-semibold text-xl">Recomendaciones de dosis de B12:</span> <NavLink to="https://unionvegetariana.org/actualizacion-sobre-las-recomendaciones-de-la-vitamina-b12/" className="underline">Unión Vegetariana - Recomendaciones actualizadas sobre dosis de B12</NavLink></li>
                        <li><span className="font-semibold text-xl">Aplicación para escanear productos en caso de dudas y que te diga si es vegano: </span><NavLink to="https://isitvegan.net/" className="underline">Is it vegan?</NavLink> </li>
                        <li><span className="font-semibold text-xl">Enlace a la cuenta de Instagram de una de mis divulgadoras favoritas: </span><NavLink to="https://www.instagram.com/veganaynormal/" className="underline">Rocío - Una familia vegana y normal</NavLink>  </li>
                        <li><span className="font-semibold text-xl">Link a su tienda, donde encontrarás, entre muchas cosas, un eBook sobre crianza vegana: </span> <NavLink to="https://veganaynormal.com/" className="underline">Tienda - Vegana y normal</NavLink></li>
                    </ul>
                </div>
            </section>
        </React.Fragment>
    );

}

export default SobreNosotros;