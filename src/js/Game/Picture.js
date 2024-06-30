import React from 'react';

const Picture = ({srcImg}) => {

    return (
        <div className="picture">
            <img src={srcImg} alt={"Image"}></img>
        </div>
    );
};

export default Picture;