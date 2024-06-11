import React, {useState, useEffect} from 'react';
import { MenuItem } from './footer';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header(){
    const history = useNavigate();
    const [data, setData] = useState({ search: '' });
    const estaLoggeado = Boolean(localStorage.getItem('logged_username')) || false;

    const alias = localStorage.getItem("logged_username");

	const goSearch = (e) => {
        e.preventDefault();
		history(`/search?search=${data.search}`);
        setData('');
	};

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        const isScrolled = window.scrollY > 0;
        setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return ( 
        <React.Fragment>
            <header className={scrolled ? 'scrolled' : ''}>
                <div className='cabecera-primera flex flex-col sm:flex-row items-center sm:items-start justify-between w-full pt-10 sm:px-10 gap-2 sm:gap-0'>
                    <div className='barra-busqueda rounded-full border-2 border-black py-1 px-1 '>
                        <form className='flex flex-row items-center justify-evenly gap-2 ' onSubmit={goSearch}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 stroke-black">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <input
                                type="text"
                                placeholder='Buscar...'
                                className='focus:outline-none font-nunito bg-transparent busqueda '
                                value={data.search}
                                onChange={(e) => setData({ search: e.target.value })}
                                id='search'
                            />
                        </form>
                    </div>

                    
                    <div className='btn-user flex flex-row items-center justify-center gap-5'>

                        {
                            !estaLoggeado && (
                                <>
                                    {/* <NavLink to="/login" className="bg-tofu-pink border border-tofu-pink duration-300 transition hover:bg-transparent inline-block py-1 px-4 rounded-full text-center uppercase text-black font-nunito">
                                        Log In
                                    </NavLink> */}
                                    <NavLink to={`/login`}>
                                        <button type="button" className="bg-white border border-tofu-blue text-center w-40 rounded-2xl h-10 relative font-nunito text-black text-xl font-semibold group">
                                            <div class="bg-tofu-blue rounded-3xl h-10 w-1/4 flex items-center justify-center absolute left-0 top-0 group-hover:w-40 z-10 duration-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                                </svg>
                                            </div>
                                            <p class="translate-x-4">Log-In</p>
                                        </button> 
                                    </NavLink>
                                    <NavLink to={`/registro`}>
                                        <button type="button" className="bg-white border border-tofu-pink text-center w-40 rounded-2xl h-10 relative font-nunito text-black text-xl font-semibold group">
                                            <div class="bg-tofu-pink rounded-3xl h-10 w-1/4 flex items-center justify-center absolute left-0 top-0 group-hover:w-40 z-10 duration-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                                </svg>
                                            </div>
                                            <p class="translate-x-4">Sign-Up</p>
                                        </button> 
                                    </NavLink>
                                    {/* <NavLink to="/registro" className="bg-tofu-blue border border-tofu-blue duration-300 transition hover:bg-transparent hover:border-tofu-blue inline-block py-1 px-4 rounded-full text-center uppercase text-black font-nunito">
                                        Sign Up
                                    </NavLink> */}
                                </>
                                
                            )
                        }

                        {
                            estaLoggeado && (
                                <>
                                    <p className='font-nunito text-lg'>¡Hola, <NavLink to={"/profile/" + alias}><span className='text-tofu-pink underline cursor-pointer font-semibold'>{alias}</span></NavLink>!</p>
                                    <NavLink to={`/logout`}>
                                        <button type="button" className="bg-white border border-tofu-pink text-center w-40 rounded-2xl h-10 relative font-nunito text-black text-xl font-semibold group">
                                            <div class="bg-tofu-pink rounded-3xl h-10 w-1/4 flex items-center justify-center absolute left-0 top-0 group-hover:w-40 z-10 duration-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                                </svg>

                                            </div>
                                            <p class="translate-x-4">Log-Out</p>
                                        </button> 
                                    </NavLink>
                                </>
                            )
                        }
                        
                        
                        
                    </div>
                </div>
                <div className='cabecera-segunda flex flex-col sm:flex-row items-center justify-center w-full relative gap-2 sm:gap-10 lg:gap-20 py-4 sm:py-0'>
                    <ul className='menu-header'>
                        <NavLink to='/posts'>
                            <MenuItem text={"Recetas"} />
                        </NavLink>
                        <NavLink to='/categorias'>
                            <MenuItem text={"Categorías"} />
                        </NavLink>
                    </ul>
                    <NavLink to="/" className={`logo transition-all transform duration-300 ease-in-out ${scrolled ? 'w-16 sm:w-32' : 'w-20 sm:w-44'}`}>
                        <img src="/images/LogoTofu.png" alt="No se Cargaaa"/>
                    </NavLink>
                    <ul className='menu-header'>
                        <NavLink to='/go-vegan'>
                            <MenuItem text={"Go vegan!"} />
                        </NavLink>
                        <NavLink to='/contacto'>
                            <MenuItem text={"Contacto"} />
                        </NavLink>
                    </ul>
                </div>
            </header>
        </React.Fragment>
    );
}

export default Header;