import React from 'react'
import './styles.css';
import RestaurantReviews from './RestaurantReviews';
import Rating from '../common/Rating';
import Header from '../common/header/Header';

const RestaurantDetail = (props) => {
    const restaurant = props.location.state;
    const name = restaurant ? restaurant.name : '';
    const average_cost_for_two = restaurant ? restaurant.average_cost_for_two : '';
    const cuisines = restaurant ? restaurant.cuisines : '';
    const location = restaurant ? restaurant.location : '';
    const timings = restaurant ? restaurant.timings : '';
    const user_rating = restaurant ? restaurant.user_rating : '';
    const id = restaurant ? restaurant.id : '';
    const featured_image = restaurant ? restaurant.featured_image : '';
    const all_reviews_count = restaurant ? restaurant.all_reviews_count : '';
    return (
        <>
        <Header isSearch={false} />
        {restaurant ?
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '4em' }}>
                <div style={{ textAlign: 'left', width: '50%' }}>
                    <div>
                        <img src={featured_image} height='500' width="100%" alt={`img-${name}`}></img>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h1>{name}</h1>
                            <div style={{ fontWeight: '500', color: '#717171'}}>
                                <div style={{ display: 'flex' }}>
                                    <Rating />{user_rating.aggregate_rating}
                                </div>
                                <p style={{ borderBottom: "dotted 2px #ababab" }}>{all_reviews_count} Reviews</p>
                            </div>
                        </div>
                    </div>
                    <div className="itemBottom">
                        <p>Quick Bites - {cuisines}</p>
                        <p>{location.address}</p>
                        <p>Cost for two - ₹{average_cost_for_two}</p>
                        <p>Hours - {timings}</p>
                        <div className="reviewHeader">
                            <span>Reviews</span>
                        </div>
                        <RestaurantReviews id={id} />
                    </div>
                </div>
            </div> : <div>No restaurant found</div>
            }           
        </>
    )
}

export default RestaurantDetail;
