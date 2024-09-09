import Navbar from "../components/Navbar/Navbar";

function NoPage() {
    return (
        <div className="content-container">
            <Navbar />
            <h1>Error 404: This page doesn't exist.</h1>
        </div>
    );
}

export default NoPage;