import React from 'react';
import "./NavBar.css"
import {useAppDispatch} from "../../hooks";
import {changeByTemp, getWeatherList} from "../../store/slices/weatherSlice";

const NavBar = () => {
    const dispatch = useAppDispatch()

    const [searchText, setSearchText] = React.useState<string>("");
    const [isTypeTemp, setIsTypeTemp] = React.useState<number>(0);

    const handleSearch = () => {
        dispatch(getWeatherList({city: searchText}))
    }
    const changeBy = (type:number) => {
        dispatch(changeByTemp(type))
        setIsTypeTemp(type)
    }
    return (
        <div className="nav-bar">
            <div className="container">
                <div>
                    <input
                        type={"text"}
                        placeholder={"Search..."}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button onClick={handleSearch}>
                        Search City
                    </button>
                </div>
                <div className="checkboxes">
                    <input
                        type={"checkbox"}
                        onChange={() => changeBy(0)}
                        checked={isTypeTemp === 0 && true}
                    />
                    <span> C </span>
                    <input
                        type={"checkbox"}
                        checked={isTypeTemp === 1 && true}
                        onChange={() => changeBy(1)}
                        // isChecked={}
                    />
                    <span> F </span>
                </div>

            </div>
        </div>
    );
};

export default NavBar;