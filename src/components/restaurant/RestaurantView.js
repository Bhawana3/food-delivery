import React, {useEffect, useState} from 'react';
import {usePosition} from '../../hooks/position';
import RestaurantList from './RestaurantList';
import Pagination from '../common/pagination/Pagination';
import { get } from '../../apis/callApi';
import Header from '../common/header/Header';
import './styles.css';

const RestaurantView = () => {
    const {latitude, longitude} = usePosition();
    const [restaurants, setRestaurant] = useState([])
    const [page, setPage] = useState(1);
    const [pageCount] = useState(20);
    const [offset, setOffset] = useState(20);
    const [pagination, setPagintion] = useState(false);

    const getRestaurants = async (latitude, longitude, offset, selectedPage) => {
        const uri = `https://developers.zomato.com/api/v2.1/search?lat=${latitude}&lon=${longitude}&start=${offset}`;
        const result = await get(uri);
        const res = (result && result.restaurants) ?  result.restaurants.map(resp => resp.restaurant): [];
        setRestaurant(res);
        setPage(selectedPage+1);
        setOffset(offset);
    }

    useEffect(() => {
        if (latitude && longitude){
            getRestaurants(latitude, longitude, 20, 0);
            setPagintion(true);
        }
    }, [latitude, longitude]);

    const handlePageClick = (selectedPage) => {
        getRestaurants(latitude, longitude, (selectedPage+1)*20, selectedPage);
    }

    const setRestaurantCallback = (res) => {
        setRestaurant([res]);
        setPagintion(false);
    }

    const removeRestaurantFromSearch = () => getRestaurants(latitude, longitude, 20, 0);
    
    const sortStyle = (event) => {
        event.target.style.color = 'green';
        event.target.style.fontWeight = '500';
    }

    const sortRestaurants = (event) => {
        const sortedData = [...restaurants].sort((a,b) => a.user_rating.aggregate_rating - b.user_rating.aggregate_rating);
        sortStyle(event);
        setRestaurant(sortedData);
    }

    return(
        <>
            <Header setRestaurant={setRestaurantCallback} removeRestaurantFromSearch={removeRestaurantFromSearch} isSearch={true} />
            <div className="listContainer">
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '31%' }}>
                        <div className="filterContainer">
                            <h4>Sort by</h4>
                            <p onClick={sortRestaurants} style={{ cursor: 'pointer' }}>Rating - high to low</p>
                        </div>
                    </div>
                    <div className="restaurantList" style={{ width: '50%' }}>
                        <RestaurantList restaurants={restaurants} />
                    </div>
                </div>
                {pagination && <Pagination 
                    pageCount={pageCount} 
                    handlePageChange={handlePageClick}
                />}
            </div>
        </>
    );
}

export default RestaurantView;
