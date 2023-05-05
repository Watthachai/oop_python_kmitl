import React, {useEffect, useState} from "react";

const MoviesModal = ({active, handleModal, movie_id, setErrorMessage}) => {
    const [title, setTitle] = useState("");
    const [release_date, setReleaseDate] = useState("")
    const [duration, setDuration] = useState("");
    const [rating, setRating] = useState("");
    const [description, setDescription] = useState("");
    const [cover_image, setCoverImage] = useState("");
    const [video_url, setVideoUrl] = useState("");

    useEffect(() => {
        const getMovies = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch(`/api/movies/${movie_id}`, requestOptions);

            if (!response.ok) {
                setErrorMessage("Could not get the movies");
            } else {
                const data = await response.json();
                setTitle(data.title);
                setReleaseDate(data.release_date);
                setDuration(data.duration);
                setRating(data.rating);
                setDescription(data.description);
                setCoverImage(data.cover_image);
                setVideoUrl(data.video_url);
            }
        };

        if (movie_id) {
            getMovies();
        }
    },[movie_id]);

    const cleanFormData = () => {
        setTitle("");
        setReleaseDate("");
        setDuration("");
        setRating("");
        setDescription("");
        setCoverImage("");
        setVideoUrl("");
    };

    const handleCreateMovies = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                duration: duration,
                rating: rating,
                description: description,
                cover_image: cover_image,
                video_url: video_url,
            }),
        };
        const response = await fetch("/api/movies", requestOptions);
        if (!response.ok) {
            setErrorMessage("Could not create the Movies");
        } else {    
            cleanFormData();
            handleModal();
        }
    };

    const handleUpdateMovies = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                release_date: release_date,
                duration: duration,
                rating: rating,
                description: description,
                cover_image: cover_image,
                video_url: video_url,
            }),
        };
        const response = await fetch(`/api/movies/${movie_id}`, requestOptions);
        if (!response.ok) {
            setErrorMessage("Could not update the movie");
        } else {
            const data = await response.json();
            setTitle(data.title);
            setReleaseDate(data.release_date);
            setDuration(data.duration);
            setRating(data.rating);
            setDescription(data.description);
            setCoverImage(data.cover_image);
            setVideoUrl(data.video_url);
            handleModal();
        }
    };
    
    return (
        <>
        <div className={`modal ${active ? "is-active" : ""}`}>
      <div className="modal-background" onClick={handleModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            {movie_id ? "Update" : "Create"} Movies
          </p>
        </header>
        <section className="modal-card-body">
          <form>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            
            <div className="field">
              <label className="label">Duration</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Rating</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="field">
              <label className="label">Cover Image</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Cover Image"
                  value={cover_image}
                  onChange={(e) => setCoverImage(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Video URL</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Video URL"
                  value={video_url}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot has-background-primary-light">
        {movie_id ? (
            <button className="button is-info" onClick={handleUpdateMovies}>
              Update
            </button>
          ) : (
            <button className="button is-primary" onClick={handleCreateMovies}>
              Create
            </button>
          )}
          <button className="button" onClick={()=>{cleanFormData(); handleModal();}}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
        </>
    );
};

export default MoviesModal;



