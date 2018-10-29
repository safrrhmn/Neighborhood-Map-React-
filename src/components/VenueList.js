import React, { Component } from 'react';
import ListItem from './ListItem'

class VenueList extends Component {

        render() {
                return (< ol className="venueList">
                        {
                                this.props.venues && this.props.venues.map((v, key) => (
                                        <ListItem key={key} {...v} />
                                ))
                        }
                </ol >)

        }

}

export default VenueList;