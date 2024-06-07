import React from 'react';
// import axios from 'axios';

const MenuItem = ({text}) => <li>{text}</li>;
const CirculoAmarilloMenu = () => <div className='rounded-full bg-tofu-yellow w-4 h-4'></div>;

export {MenuItem};

function Footer(){
    return ( 
        <React.Fragment>
            <footer className='flex flex-col items-center justify-center'>
                <div className='flex flex-row items-center justify-center gap-10 py-5'>
                    <img src="/images/LogoTofuFooter.png" alt="Tofu Tastico Footer" className='w-44'/> 
                    <div className='flex flex-col items-start justify-start gap-10'>
                        <ul className='menu-header'>
                            <MenuItem text={"Item Menú"} />
                            <MenuItem text={"Item Menú"} />
                            <MenuItem text={"Item Menú"} />
                        </ul>
                        <ul className='menu-header'>
                            <MenuItem text={"Item Menú"} />
                            <MenuItem text={"Item Menú"} />
                            <MenuItem text={"Item Menú"} />
                        </ul>
                    </div>
                </div>
                <div className='h-[0.10rem] w-full bg-tofu-grey'></div>
                <div className='flex flex-row items-center justify-center gap-5 py-5'>
                    <p className='font-nunito text-base'>© Tofu Tástico! <span className='italic'>2024</span></p>
                    <ul className='menu-footer flex flex-row items-center justify-start gap-5'>
                        <MenuItem text={"Política de Privacidad"} />
                        <CirculoAmarilloMenu />
                        <MenuItem text={"Política de Cookies"} />
                        <CirculoAmarilloMenu />
                        <MenuItem text={"Términos y Condiciones"} />
                        <CirculoAmarilloMenu />
                        <MenuItem text={"Quiénes Somos"} />
                        <CirculoAmarilloMenu />
                        <MenuItem text={"Contacto"} />
                    </ul>
                </div>
                
            </footer>
        </React.Fragment>
    );
}

export default Footer;