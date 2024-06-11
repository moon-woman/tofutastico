import React from 'react';

function CategoriaLoading(Component) {
    return function CategoriaLoadingComponent({ isLoading, ...props}) {
        if(!isLoading) return <Component {...props} />;
        return (
            <p>Esperando...</p>
        );
    }
}

export default CategoriaLoading;