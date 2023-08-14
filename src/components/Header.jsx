import React from "react";

const Header = ({ heading, paragraph }) => {
    return (
        <div className="mb-6">
            <h3 className="text-2xl font-semibold text-center">{heading}</h3>
            <p className="text-center">{paragraph}</p>
        </div>
    );
};

export default Header;
