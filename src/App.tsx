import React from 'react';
import './index.css';
import { useState } from 'react';

//@ts-ignore
import Logo from './2023-04-20.jpg';

const App = () => {
    const [state, setState] = useState<number>(1111111011)

    const onBtnClick = () => {
        setState(0)
    }

    return (
        <div>
            <img src={Logo} alt="" />
            <h1>value = ${state}</h1>
            <button onClick={onBtnClick}></button>
        </div>
    );
};

export default App;