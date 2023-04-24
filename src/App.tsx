import React from 'react';
import './index.css';
import { useState } from 'react';

const App = () => {
    const [state, setState] = useState<number>(11111110)

    const onBtnClick = () => {
        setState(0)
    }

    return (
        <div>
            <h1>value = ${state}</h1>
            <button onClick={onBtnClick}></button>
        </div>
    );
};

export default App;