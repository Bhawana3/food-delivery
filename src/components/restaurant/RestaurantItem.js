import React from 'react'
import { Link } from 'react-router-dom';
import './styles.css';

const RestaurantItem = (props) => {
    const { restaurant } = props;
    const { name, thumb, average_cost_for_two, cuisines, location, timings, user_rating, id } = restaurant;
    return (
        <div className="restaurantItem">
            <div className="itemTop">
                <img src={thumb} height='100' width='100' alt={`img-${name}`}></img>
                <div className="itemTopDetails">
                    <Link className="title" to={{ pathname: `/${id}`, state: restaurant }}>{name}</Link>
                    <p>&#9733; {user_rating.aggregate_rating} ({user_rating.votes})</p>
                    <p>{location.address}</p>
                </div>
            </div>
            <div className="itemBottom">
                <p>CUISINES: {cuisines}</p>
                <p>COST FOR TWO: ₹{average_cost_for_two}</p>
                <p>HOURS: {timings}</p>
            </div>
        </div>
    )
}

export default RestaurantItem;
