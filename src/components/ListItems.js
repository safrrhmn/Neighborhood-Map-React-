import React, { Component } from 'react';

export default class ListItems extends Component {

        render() {
                return (
                        < ol role="list">
                                {
                                        this.props.venues && this.props.venues.map((v, key) => (
                                                <li role="listitem" aria-labelledby={v.venue.name} className="listItem" key={key} tabIndex={key} {...this.props} onClick={() => this.props.onOpenModal(v.venue, this.props.markers)}>
                                                        {v.venue.name}
                                                </li>)
                                        )
                                }
                        </ol >

                )
        }
}