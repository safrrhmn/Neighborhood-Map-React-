import React, { Component } from 'react';
import VenueList from './VenueList'
import PropTypes from 'prop-types'


class Sidebar extends Component {
        state = {
                query: '',
                venues: []
        }


        sideBarHandler = (e) => {
                this.setState({
                        query: e.target.value,
                        venues: this.props.venues.filter(x => x.venue.name.toLowerCase().includes(e.target.value.toLowerCase()))
                })
        }

        render() {

                return (
                        <div className="sideBar">
                                <input type="search" placeholder="Search" id="search" onChange={this.sideBarHandler} />
                                <VenueList {...this.props} onChangeHandler={this.sideBarHandler} />
                        </div>
                );
        }
}

export default Sidebar;