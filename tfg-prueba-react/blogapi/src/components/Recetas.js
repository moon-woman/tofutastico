import React from 'react';
import { NavLink } from 'react-router-dom';



const Recetas = (props) => {
    const { recetas } = props;
   
   

    if(!recetas || recetas.length === 0) return <p>No hay recetas</p>;

    return (
        <React.Fragment>
            <div className='flex flex-wrap justify-center items-center gap-10 py-20'>
                {recetas.map((receta) => {
                    return (
                        <div key={receta.id} className='flex flex-col items-start justify-start gap-5 w-1/4'>
                            <div style={{backgroundImage: `url(${receta.photo})`}} className='w-full h-72 bg-center bg-cover rounded-3xl'></div>
                            <NavLink to={"post/" + receta.slug}>
                                <h1 className="text-2xl font-montserrat text-tofu-pink font-bold">{receta.title}</h1>
                            </NavLink>
                            <p className='font-nunito text-lg text-black'>{receta.excerpt.substring(0, 100)}...</p>
                        </div>

                    );

                })}

                

            </div>
        </React.Fragment>
    );
}

export default Recetas;