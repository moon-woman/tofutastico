import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuItem = ({text}) => <li>{text}</li>;
const CirculoAmarilloMenu = () => <div className='rounded-full bg-tofu-yellow w-4 h-4'></div>;

export {MenuItem};

function Footer(){
    return ( 
        <React.Fragment>
            <footer className='flex flex-col items-center justify-center'>
                <div className='h-[0.10rem] w-full bg-tofu-grey'></div>
                <div className='flex flex-col sm:flex-row items-center justify-center gap-5 py-5'>
                    <p className='font-nunito text-base'>© Tofu Tástico! <span className='italic'>2024</span></p>
                    <ul className='menu-footer flex flex-col sm:flex-row items-center justify-start gap-5'>
                        <NavLink to='/go-vegan' className="flex flex-row items-center justify-center gap-1">
                            <CirculoAmarilloMenu />
                            <MenuItem text={"Go vegan!"} />
                        </NavLink>
                        <NavLink to='/posts' className="flex flex-row items-center justify-center gap-1">
                            <CirculoAmarilloMenu />
                            <MenuItem text={"Recetas"} />
                        </NavLink>
                        <NavLink to='/categorias' className="flex flex-row items-center justify-center gap-1">
                            <CirculoAmarilloMenu />
                            <MenuItem text={"Categorías"} />
                        </NavLink>
                        <NavLink to='/contacto' className="flex flex-row items-center justify-center gap-1">
                            <CirculoAmarilloMenu />
                            <MenuItem text={"Contacto"} />
                        </NavLink>
                    </ul>
                </div>
                
            </footer>
        </React.Fragment>
    );
}

export default Footer;