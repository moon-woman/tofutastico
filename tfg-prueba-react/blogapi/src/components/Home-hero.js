import React from 'react';

const scrollDown = () => {
   
    const discover = document.getElementById('discover');
    discover.scrollIntoView({behavior: 'smooth'});
   
}

const Hero = () => {
  return (
    <div className="video-container flex items-center justify-center">
        <video
            src="../images/hero.mp4"
            autoPlay
            loop
            playsInline
            disablePictureInPicture
            muted
            className="video relative inset-0 h-svh w-full object-cover object-center -z-10"
        >
            Tu navegador no soporta la etiqueta de vídeo.
        </video>
        <div className='absolute top-1/2 left-1/3 w-fit z-10'>
            <h1 className='font-montserrat font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-6xl text-white text-center'>¡Bienvenido/a a Tofu Tástico!</h1>
            <img src="../images/seal.png" alt="Sellito VEGAN" className='w-40 sm:w-64 lg:w-72 xl:w-96 absolute -left-36 sm:-left-64 lg:-left-80 2xl:-left-96 bottom-4 sm:-bottom-24'/>
        </div>
        <button id="btnScroll" class="animate-scrolldown absolute bottom-10 sm:bottom-12 sm:visible invisible" onClick={scrollDown}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 stroke-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
        </button>
    </div>
  );
};

export default Hero;
