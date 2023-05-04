import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";
import LeadModal from "./LeadModal";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaPen, FaPencilAlt } from 'react-icons/fa';

const Table = () => {
    const [token] = useContext(UserContext);
    const [leads, setLeads] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [activeModal, setActiveModal] = useState(false);
    const [id, setId] = useState(null);

    const handleUpdate = async (id) => {
        setId(id);
        setActiveModal(true);
    };

    const handleDelete = async (id) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch(`/api/leads/${id}`, requestOptions);
        if  (!response.ok) {
            setErrorMessage("ลบไม่สำเร็จ!")
        } 

        getLeads();
    };

    const getLeads = async () => { 
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };
        const response = await fetch("/api/leads", requestOptions);
        if (!response.ok) {
            setErrorMessage("อ๊ะ!! มีบางอย่างผิดพลาด ไม่สามารถโหลดตารางได้");
        } else {
            const data = await response.json();
            setLeads(data);
            setLoaded(true);
        }
    };

    useEffect(() => {
        getLeads();
    }, []);
    
    const handleModal = () => {
        setActiveModal(!activeModal);
        getLeads();
        setId(null);
    }

    return (
        <>
            <LeadModal
            active={activeModal } 
            handleModal={handleModal}
            token={token}
            id={id}
            errorMessage={setErrorMessage}
            />
            <button className="button is-fullwidth mb-5 is-primary" 
            onClick={() => setActiveModal(true)}>
                Create Lead
            </button>
                <ErrorMessage message={errorMessage} />
                {loaded && leads ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Company</th>
                                    <th>Email</th>
                                    <th>Note</th>
                                    <th>Last Updated</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((lead) => (
                                <tr key={lead.id}>
                                    <td>{lead.first_name}</td>
                                    <td>{lead.last_name}</td>
                                    <td>{lead.company}</td>
                                    <td>{lead.email}</td>
                                    <td>{lead.note}</td>
                                    <td>{moment(lead.date_last_updated).format("MMM Do YY")}</td>
                                    <td>
                                        <button className="button mr-2 is-info is-light" onClick={ () => handleUpdate(lead.id)}>
                                            Update
                                        </button>
                                        <button className="button mr-2 is-danger is-light"
                                        onClick={() => handleDelete(lead.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default Table;