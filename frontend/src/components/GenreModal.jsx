import React, { useEffect, useState } from "react";

const GenreModal = ({ active, handleModal, handleGenreModal, genre_id, setErrorMessage }) => {
    const [genre_name, SetGenreName] = useState("");

    useEffect(() => {
        const getGenres = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch(`/api/genres/${genre_id}`, requestOptions);

            if (!response.ok){
                setErrorMessage("Could not get genre");
            } else {
                const data = await response.json();
                SetGenreName(data.genre_name);
            }
        };
        if (genre_id){
            getGenres();
        }
    }, [genre_id]);
    
    const cleanFormData = () => {
        SetGenreName("");
    };

    const handleCreateGenres = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                genre_name: genre_name,
            }),
        };
        const response = await fetch("/api/genres", requestOptions);
        if (!response.ok){
            setErrorMessage("Could not create the genre");
        } else {
            cleanFormData();
            handleModal();
        }
    };
    
    const handleUpdateGenres = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                genre_name: genre_name,
            }),
        };
        const response = await fetch(`/api/genres/${genre_id}`, requestOptions);
        if (!response.ok) {
            setErrorMessage("Could not update Genre");
        } else {
            const data = await response.json();
            SetGenreName(data.genre_name);
            handleModal();
        }
    };

    return (
        <div className={`modal ${active ? "is-active" : ""}`}>
          <div className="modal-background" onClick={handleModal}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">
                {genre_id ? "Update" : "Create"} Genre
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
                      value={genre_name}
                      onChange={(e) => SetGenreName(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </section>
            <footer className="modal-card-foot has-background-primary-light">
            {genre_id ? (
                <button className="button is-info" onClick={handleUpdateGenres}>
                  Update
                </button>
              ) : (
                <button className="button is-primary" onClick={handleCreateGenres}>
                  Create
                </button>
              )}
              <button className="button" onClick={()=>{cleanFormData(); handleModal();}}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      );
}

export default GenreModal;