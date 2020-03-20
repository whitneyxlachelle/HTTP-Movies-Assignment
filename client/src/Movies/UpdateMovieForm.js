import React, { useState, useEffect } from 'react';
import axios from "axios";

const initialMovie = {
    id: 0,
    title: "",
    director: "",
    metascore: "",
    stars: [],
}

const UpdateMovieForm = (props) => {
    //console.log(props);
    const [updateMovie, setUpdateMovie] = useState(initialMovie)
    const { id } = props.match.params;

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log(res.data)
                setUpdateMovie(res.data)
            })
    }, [id])


    const handleSubmit = event => {
        event.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, updateMovie)
            .then(res => {
                console.log(res);
                setUpdateMovie(initialMovie);
                props.history.push("/");
            })
            .catch(error => {
                console.log(error);
            });
    };


    const handleChange = event => {
        event.preventDefault();
        if (event.target.name === "stars") {
            setUpdateMovie({
                ...updateMovie,
                [event.target.name]: event.target.value.split(",")
            })
        } else {

            setUpdateMovie({
                ...updateMovie,
                [event.target.name]: event.target.value
            })
            console.log(updateMovie);
        }
    }
    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="Title"
                    value={updateMovie.title}
                />
                <input
                    type="text"
                    name="director"
                    onChange={handleChange}
                    placeholder="Director"
                    value={updateMovie.director}
                />
                <input
                    type="text"
                    name="metascore"
                    onChange={handleChange}
                    placeholder="MetaScore"
                    value={updateMovie.metascore}
                />
                <input
                    type="text"
                    name="stars"
                    onChange={handleChange}
                    placeholder="Stars"
                    value={updateMovie.stars}
                />
                <button className="button">Update</button>
            </form>
        </div>
    )
}

export default UpdateMovieForm;