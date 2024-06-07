import React, {useState, useEffect} from 'react';
import axiosInstancia from '../axios';
import { useParams } from 'react-router-dom';


export default function Receta() {

    const { slug } = useParams();

    const [data, setData] = useState({posts: []});

    useEffect(() => {
        axiosInstancia.get(slug).then((respuesta) => {
            setData(respuesta.data);
            console.log(respuesta.data);
        });
    }, [slug]);
    

    return (
        <React.Fragment>
            {data.posts.map(post => (
                <div key={post.id}>
                    <div>{post.title}</div>
                    <div>{post.excerpt}</div>
                </div>
            ))}
        </React.Fragment>
    );
    

}