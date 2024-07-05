import React from 'react'
import { useRouteError } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { ReactComponent as NotFound } from "../assets/images/404_notfound.svg";

const ErrorPage = () => {

    let error = useRouteError();
    console.error(error);

    return (
    <>
        <Navbar />
        <div style={{ marginTop: "120px" }}></div>

        <div className="notfound-grid">
            {error.status === 404 && <div style={{ padding: "20px", fontSize: "30px", fontWeight: 700, textAlign: "center" }}>Å nei, denne siden finnes ikke!</div>}
            <NotFound className="errorpage" />
        </div>
    </>
    )
}

export default ErrorPage;