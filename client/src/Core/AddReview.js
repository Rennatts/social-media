
import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import Async, { makeAsyncSelect } from 'react-select/async';
import makeAnimated from 'react-select/animated';

function AddReview() {

    const[selectedOption, setSelectedOption] = useState([]);
    const [success, setSuccess]= useState(false);

    const animatedComponent = makeAnimated();


    const onChangeSelectedOption = (selectedOption) => {
        //console.log(e); // <---- this will be selected object not event
        //const selectedOption = e.target.value; // <--- you can get value from object directly
        setSelectedOption(selectedOption || []);
        setSuccess(true);
    };

    function handleInputChange(event) {
        console.log(event); // <---- this will be selected object not event
        setSelectedOption(event.target.value);
        setSuccess(true);
    };

    async function loadOptions (inputText, callback) {

        const response = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${inputText}`);
        const json = await response.json();
        console.log(json);

        callback((json.map(i=> ({label: i.brand}))))
    }

    console.log(selectedOption)


    return (
        <div className="brands">
    
            <AsyncSelect
            isMulti
            components={animatedComponent}
            value={selectedOption}
            onChange={onChangeSelectedOption}
            placeholder="select a brand"
            loadOptions={loadOptions}
            defaultOptions={false}
            theme ={theme => ({
                ...theme,
                boderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary25: 'hotpink',
                    primary: 'black',
                    neutral0: "#f5f7f7",
                    neutral90: 'white'
                },
            })}>
            </AsyncSelect>
        </div>
    )
}

export default AddReview

