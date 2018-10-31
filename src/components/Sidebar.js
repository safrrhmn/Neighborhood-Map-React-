import React, { Component } from 'react';
import VenueList from './VenueList'
import PropTypes from 'prop-types'
/**
 * Resposible for sidebar rendering
 *
 * @class Sidebar
 * @extends {Component}
 */
class Sidebar extends Component {
        state = {
                query: ''
        }

        render() {

                return (
                        <aside className="sideBar">
                                <input type="search" placeholder="Search" id="search" onChange={(e) => this.props.onSidebarHandler(e.target.value)} />
                                <VenueList {...this.props} onSidebarHandler={(e) => this.props.onSidebarHandler(e.target.value)} />
                        </aside>
                );
        }
}

Sidebar.propTypes = {
        onSidebarHandler: PropTypes.func
}

export default Sidebar;