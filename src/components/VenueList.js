import React, { Component } from 'react';
import PropTypes from 'prop-types'
/**
 * Resposible for generating the List of Restaurent avaiable in the specified location
 *
 * @class VenueList
 * @extends {Component}
 */
class VenueList extends Component {

        render() {
                return (< ol className="venueList">
                        {
                                this.props.venues && this.props.venues.map((v, key) => (
                                        <li className="listItem" key={key}>
                                                {v.venue.name}
                                        </li>
                                ))
                        }
                </ol >)

        }

}
VenueList.propTypes = {
        venues: PropTypes.array
}

export default VenueList;