import React from 'react';
import SearchBar from '../../search/SearchBar';
import {Link} from 'react-router-dom';
import './styles.css';

const Header = (props) => {
    const { isSearch, setRestaurant, removeRestaurantFromSearch } = props;
    return (
        <>
            <div className="header">
                <Link to='/' className="logo">Food Delivery</Link>
                {isSearch && <form className="searchBarForm" onSubmit={(event) => event.preventDefault()}>
                    <SearchBar setRestaurant={setRestaurant} removeSearch={removeRestaurantFromSearch} /> 
                </form>
                }
            </div>
        </>
    )
}

export default Header;
