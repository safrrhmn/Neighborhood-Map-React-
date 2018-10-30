import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import Sidebar from './components/Sidebar'
import PropTypes from 'prop-types'
/**
 * The parent component which handles all the other components of the app
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  constructor(props) {
    super(props)
    this.sideBarHandler = this.sideBarHandler.bind(this)
  }

  originalVenueList = [];

  state = {
    markers: [],
    venues: []
  }

  /**
   * 
   * @param {String} e
   * End-user input in the search button which filters and handles how the map is shown 
   */
  sideBarHandler(e) {
    if (e) {
      this.setState({
        venues: this.state.venues.filter(x => x.venue.name.toLowerCase().includes(e.toLowerCase()))
      }, () => this.initMap())
    } else {
      this.setState({
        venues: this.originalVenueList
      }, () => this.initMap())
    }
  }

  componentDidMount() {
    this.getVenues();
  }

  /**
   *
   *
   * @memberof App
   * It renders the map on UI
   */
  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAyFE8IHNy5hmORP910dG-tEuVbT4yOkRo&callback=initMap")
    window.initMap = this.initMap;
  }

  /**
   *
   *
   * @memberof App
   * Fetches the value from foursquare API asynchronously and set the state accordingly
   */
  getVenues = () => {

    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "WSKMYZIM1C3K4BBCP4VLOSKHNHUDGG2MTDPKB5ON5MVN4UEG",
      client_secret: "ZN0RHBRGEZC2FYYLAES3L4SXS5B1WTR2PX0PI14WZM4TXFYS",
      query: "food",
      near: "Rockville, MD",
      v: "20182507"
    }

    axios.get(endPoint + new URLSearchParams(parameters)).then(response => {
      this.setState({
        venues: response.data.response.groups[0].items
      }, () => {
        this.renderMap()
        this.originalVenueList = this.state.venues;
      })
    }).catch(error => {
      console.log(error)
    })


  }

  /**
   *Iniiate the map load
   *
   * @memberof App
   */
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 39.084179, lng: -77.152901 },
      zoom: 12
    });

    var infowindow = new window.google.maps.InfoWindow()

    this.state.venues.map(v => {
      let marker = new window.google.maps.Marker({
        position: { lat: v.venue.location.lat, lng: v.venue.location.lng },
        map: map,
        title: v.venue.name
      })
      marker.addListener('click', function () {
        infowindow.setContent(v.venue.name + "<br>" + v.venue.location.formattedAddress[0])
        infowindow.open(map, marker);
      })
      this.state.markers.push(marker)
    })
  }

  render() {
    return (
      <main id="main">
        <Sidebar {...this.state} onSidebarHandler={this.sideBarHandler} />
        <div id="map"></div>
      </main>
    );
  }
}

/**
 *
 *
 * @param {*} url
 * loads all necessary script in the DOM
 */
function loadScript(url) {
  let index = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

App.proprTypes = {
  markers: PropTypes.array,
  venues: PropTypes.array
}

export default App;
