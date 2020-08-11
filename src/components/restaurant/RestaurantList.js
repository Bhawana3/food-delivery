import React from 'react'
import RestaurantItem from './RestaurantItem';

const RestaurantList = (props) => {
    const { restaurants } = props;
    return (
        <div>
            {restaurants.length > 0 ? restaurants.map(restaurant => (
                <div key={restaurant.id}>
                    <RestaurantItem restaurant={restaurant} />
                </div>))
            : <div style={{ margin: '20px' }}>No restaurants found</div>}
        </div>
    )
}

export default RestaurantList;
