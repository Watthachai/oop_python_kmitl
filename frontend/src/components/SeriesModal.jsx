import React, { useEffect, useState } from "react";

const SeriesModal = ({ active, handleModal, series_id, setErrorMessage }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //const [release_date, setRelease_date] = useState("");
  const [cover_image, setCover_image] = useState("");

  useEffect(() => {
    
    const getSeries = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`/api/series/${series_id}`, requestOptions);

      if (!response.ok) {
        setErrorMessage("Could not get the series");
      } else {
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        //setRelease_date(data.release_date);
        setCover_image(data.cover_image);
      }
    };

    if (series_id) {
      getSeries();
    }
  }, [series_id]);

  const cleanFormData = () => {
    setTitle("");
    setDescription("");
    //setRelease_date("");
    setCover_image("");
  };

  const handleCreateSeries = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        //release_date: release_date,
        cover_image: cover_image,
      }),
    };
    const response = await fetch("/api/series", requestOptions);
    if (!response.ok) {
      setErrorMessage("Could not create the series");
    } else {    
      cleanFormData();
      handleModal();
    }
  };

  const handleUpdateSeries = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        //release_date: release_date,
        cover_image: cover_image,
      }),
    };
    const response = await fetch(`/api/series/${series_id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Could not update the series");
    } else {
      const data = await response.json();
      setTitle(data.title);
      setDescription(data.description);
      //setRelease_date(data.release_date);
      setCover_image(data.cover_image);
      handleModal();
    }
  };
  

  const handleDeleteSeries = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`/api/series/${series_id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Could not delete the series");
    } else {
      cleanFormData();
      handleModal();
    }
  };

  return (
    <div className={`modal ${active ? "is-active" : ""}`}>
      <div className="modal-background" onClick={handleModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            {series_id ? "Update" : "Create"} Series
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
                  onChange={(e) => setCover_image(e.target.value)}
                />
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot has-background-primary-light">
        {series_id ? (
            <button className="button is-info" onClick={handleUpdateSeries}>
              Update
            </button>
          ) : (
            <button className="button is-primary" onClick={handleCreateSeries}>
              Create
            </button>
          )}
          <button className="button" onClick={handleModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default SeriesModal;