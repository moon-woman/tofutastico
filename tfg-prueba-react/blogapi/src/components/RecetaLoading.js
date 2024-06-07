import React from 'react';

function RecetaLoading(Component) {
    return function RecetaLoadingComponent({ isLoading, ...props}) {
        if(!isLoading) return <Component {...props} />;
        return (
            <p>Esperando...</p>
        );
    }
}

export default RecetaLoading;