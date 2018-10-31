import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ListItems from './ListItems'
/**
 * Resposible for generating the List of Restaurent avaiable in the specified location
 *
 * @class VenueList
 * @extends {Component}
 */
class VenueList extends Component {
        render() {
                return (< ol className="venueList">
                        <ListItems {...this.props} />
                </ol >)

        }

}
VenueList.propTypes = {
        venues: PropTypes.array
}

export default VenueList;