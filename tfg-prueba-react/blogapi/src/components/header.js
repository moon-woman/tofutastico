import React from 'react';
import { MenuItem } from './footer';
import { NavLink } from 'react-router-dom';
// import axios from 'axios';

function Header(){
    return ( 
        <React.Fragment>
            <header className='cabecera duration-300 flex flex-col items-start justify-start w-full bg-white'>
                <div className='cabecera-primera flex flex-row items-start justify-between w-full pt-10 px-10'>
                    <div className='barra-busqueda rounded-full border border-black py-1 px-1'>
                        <form className='flex flex-row items-center justify-evenly gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 stroke-black">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <input
                                type="text"
                                placeholder='Buscar...'
                                className='focus:outline-none font-nunito'
                                // value={query}
                                // onChange={e => setQuery(e.target.value)}
                            />
                        </form>
                    </div>

                    
                    <div className='btn-user flex flex-row items-center justify-center gap-5'>
                        <NavLink to="/login" className="bg-tofu-pink border border-tofu-pink duration-300 transition hover:bg-transparent inline-block py-1 px-4 rounded-full text-center uppercase text-black font-nunito">
                            Log In
                        </NavLink>
                        <NavLink to="/registro" className="bg-tofu-blue border border-tofu-blue duration-300 transition hover:bg-transparent hover:border-tofu-blue inline-block py-1 px-4 rounded-full text-center uppercase text-black font-nunito">
                            Sign Up
                        </NavLink>
                        <NavLink to="/logout" className="bg-transparent border border-tofu-pink duration-300 transition hover:bg-tofu-pink inline-block py-1 px-4 rounded-full text-center uppercase text-black font-nunito">
                            Log Out
                        </NavLink>
                    </div>
                </div>
                <div className='cabecera-segunda flex flex-row items-center justify-between w-full relative px-96'>
                    <ul className='menu-header'>
                        <MenuItem text={"Item Menú"} />
                        <MenuItem text={"Item Menú"} />
                        <MenuItem text={"Item Menú"} />
                    </ul>
                    <NavLink to="/">
                        <img src="/images/LogoTofu.png" alt="No se Cargaaa" className='w-44'/>
                    </NavLink>
                    <ul className='menu-header'>
                        <MenuItem text={"Item Menú"} />
                        <MenuItem text={"Item Menú"} />
                        <MenuItem text={"Item Menú"} />
                    </ul>
                </div>
            </header>
        </React.Fragment>
    );
}

export default Header;