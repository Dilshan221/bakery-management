import React from "react";
import Header from "./Header";


const Layout = ({ children }) => {
  return (
    <div className="container-fluid">
      <Header />
      <div className="row">
        {/* The sidebar is now part of the Header component */}
        <div id="content" className="col-md-10 split">
          {children}
       
        </div>
      </div>
    </div>
  );
};

export default Layout;
