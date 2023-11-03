import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./../components/Layout/Layout";

const Pagenotfound = () => {
  const navigate = useNavigate()
  return (
    <Layout title={"go back- page not found"}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        {/* <Link to="/" className="pnf-btn">
          Go Back
        </Link> */}
        <button onClick={()=> (navigate(-1))} className="pnf-btn">
          Go Back
        </button>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
