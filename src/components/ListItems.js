import React, { Component } from 'react';
import PropTypes from 'prop-types'

export default class ListItems extends Component {

        render() {
                return (
                        < ol >
                                {
                                        this.props.venues && this.props.venues.map((v, key) => (
                                                <li className="listItem" key={key} tabIndex={key} {...this.props} onClick={() => this.props.onOpenModal(v.venue, this.props.markers)}>
                                                        {v.venue.name}
                                                </li>)
                                        )
                                }
                        </ol >

                )
        }
}