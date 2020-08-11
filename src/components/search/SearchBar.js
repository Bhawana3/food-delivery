import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import { get } from '../../apis/callApi';
import './styles.css';

class SearchBar extends Component {
    state = {
        query: '',
        options: [],
        activeOption: 0,
        filteredOptions: [],
        showOptions: false,
        selectedOptions: {}
    };

    _callApi = async () => {
        if (this.state.query) {
            const result = await get(`https://developers.zomato.com/api/v2.1/search?q=${this.state.query}`);
            const res = result.restaurants.map(resp => resp.restaurant);
            if(res) {
                this.setState({ 
                    options: res,
                    activeOption: 0,
                    filteredOptions: res,
                    showOptions: true,
                });
            }
        } 
    };

    callDebouncedApi = debounce(this._callApi, 500);

    onChange = (event) => {
        let searchString = event.target.value;
        this.setState({ query: searchString });      
        this.callDebouncedApi();
    };

    clearQuery = () => {
        this.setState({ query: '' });
    }

    onKeyDown = (event) => {
        const { activeOption, filteredOptions } = this.state;

        if (event.keyCode === 13) {
            if (filteredOptions[activeOption]) {
                this.setState({
                    activeOption: 0,
                    showOptions: false,
                    query: filteredOptions[activeOption].name,
                    selectedOptions: filteredOptions[activeOption]
                });
                this.props.setRestaurant(filteredOptions[activeOption]);
            }
            this.clearQuery();
        } else if (event.keyCode === 38) {
            if (activeOption === 0) {
                return;
            }
            this.setState({ activeOption: activeOption - 1 });
        } else if (event.keyCode === 40) {
            if (activeOption === filteredOptions.length - 1) {
                return;
            }
            this.setState({ activeOption: activeOption + 1 });
        }
    };

    handleCrossClick = () => this.setState({ selectedOptions: {} }, () => this.props.removeSearch());

    onClick = (selectedOption) => {
        this.setState({
            activeOption: 0,
            showOptions: false,
            query: '',
            selectedOptions: selectedOption
        });
        this.props.setRestaurant(selectedOption);
    }; 

    render() {
        const {
            onChange,
            onKeyDown,
            onClick,
            state: { activeOption, filteredOptions, showOptions, query }
        } = this;
        let optionList;
        if (showOptions && query) {
            if (filteredOptions.length) {
                optionList = (
                    <ul className="options">
                        {filteredOptions.map((optionName, index) => {
                            let className;
                            if (index === activeOption) {
                                className = 'option-active';
                            }
                            return (
                                <li className={className} key={index} onClick={() => onClick(optionName)}>
                                    {optionName.name}
                                </li>
                            );
                        })}
                    </ul>
                );
            }
        }
        return (
            <>
                <div className="input-tag">
                    <ul className="input-tag__tags">
                        {this.state.selectedOptions.name && 
                            <li>{this.state.selectedOptions.name}
                                <button type="button" onClick={this.handleCrossClick}>+</button>
                            </li>
                        }
                        <li className="input-tag__tags__input">
                            <input 
                                type="text"
                                className="search-box"
                                onChange={onChange}
                                onKeyDown={onKeyDown}
                                value={query} 
                                placeholder='Search restaurants..'
                                height='40'
                            />
                        </li>
                    </ul>
                </div>
                {optionList}
            </>
        );
    }
}

export default SearchBar;