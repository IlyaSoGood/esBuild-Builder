import React from 'react';
import './index.css';

const App = () => {

    const onBtnClick = () => {
        throw new Error();
    }

    return (
        <div>
            <h1>HELLO WORLD!</h1>
            <button onClick={onBtnClick}></button>
        </div>
    );
};

export default App;