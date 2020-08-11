import React, { Component } from 'react';
import Rating from '../common/Rating';
import { get } from '../../apis/callApi';
import './styles.css';

class RestaurantReviews extends Component {
    state = { reviews: [] }

    async componentDidMount() {
        const uri = `https://developers.zomato.com/api/v2.1/reviews?res_id=${this.props.id}`;
        const result = await get(uri);
        const reviews = result.user_reviews.map(review => review.review);
        this.setState({ reviews: reviews})
    };
    
    render() {
        return (
            <div>
                {this.state.reviews.map(review => (
                    <div className="reviewContainer" key={review.id}>
                        <div className="user">
                            <img src={review.user.profile_image} alt={`${review.user.name}-icon`} height="40" width="40"/>
                            <p className="username">{review.user.name}</p>
                        </div>
                        <div style={{ display: 'flex',padding: '10px'}}>
                            <span><Rating /></span>&nbsp;&nbsp;
                            <span style={{fontSize: 'small' }}>{review.review_time_friendly}</span>
                        </div>
                        <div key={review.id}>{review.review_text}</div>
                    </div>
                ))}
            </div>
        )
    }
}

export default RestaurantReviews;