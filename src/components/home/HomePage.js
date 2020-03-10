import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="jumbotron">
    <h1>Admin Page</h1>
    <p>Manage things on admin page</p>
    <Link to="about" className="btn btn-primary btn-lg">
      Learn More
    </Link>
  </div>
);

export default HomePage;
