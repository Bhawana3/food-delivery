import React from 'react'
import './styles.css';
import RestaurantReviews from './RestaurantReviews';
import Rating from '../common/Rating';
import Header from '../common/header/Header';

const RestaurantDetail = (props) => {
    const restaurant = props.location.state;
    const { name, average_cost_for_two, cuisines, location, timings, user_rating, id, featured_image, all_reviews_count } = restaurant;
    return (
        <>
        <Header isSearch={false} />
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
        </div>
        </>
    )
}

export default RestaurantDetail;
