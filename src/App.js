import React, { Component } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
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
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)

  }

  originalVenueList = [];

  state = {
    markers: [],
    venues: [],
    modalIsOpen: false,
    modalHeader: '',
    formattedAddress: [],
    errorMessage: ''
  }

  customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
      opacity: 0.75
    }
  };

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
   *openModal
   *
   * @param {*} prp
   * @param {*} markers
   * @memberof App
   */
  openModal(prp, markers) {

    this.setState({
      modalIsOpen: true,
      modalHeader: prp.name,
      formattedAddress: prp.location.formattedAddress
    })
    markers.filter(x => (x.title.toLowerCase().includes(prp.name.toLowerCase()))).forEach(marker => {
      marker.setAnimation(2)
    })
  }

  /**
   *
   *afterOpenModal
   * @memberof App
   */
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  /**
   *
   *closeModal
   * @memberof App
   */
  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  /**
   *  Reponsible for opening a sorry modal dialog to the end user when something goes wrong
   *
   * @param {*} error
   * @memberof App
   */
  openSorryModal(error) {
    this.setState({
      modalIsOpen: true,
      modalHeader: "Sorry something terrible happened",
      errorMessage: error.message
    })
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

    fetch(endPoint + new URLSearchParams(parameters)).then(response => {
      response.json().then((data) => {
        this.setState({
          venues: data.response.groups[0].items
        }, () => {
          this.renderMap()
          this.originalVenueList = this.state.venues;
        })
      }).catch(error => {
        this.openSorryModal(error)
      })
    }).catch(error => {
      this.openSorryModal(error)
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
        marker.setAnimation(4);
      })
      this.state.markers.push(marker)
    })
  }

  render() {
    return (
      <main id="main">
        <Sidebar {...this.state} onSidebarHandler={this.sideBarHandler} onOpenModal={this.openModal} />
        <div id="map"></div>
        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={this.customStyles}
            contentLabel={this.state.modalHeader}
          >
            <button onClick={this.closeModal}>close</button>
            <h1 ref={subtitle => this.subtitle = subtitle}>{this.state.modalHeader}</h1>
            <div>
              <p>{this.state.formattedAddress[0]}<br></br>{this.state.formattedAddress[1]}</p>
            </div>
          </Modal>
        </div>
      </main >
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
  script.onerror = function (e) {
    alert("Error loading " + this.src);
  };
}

App.proprTypes = {
  markers: PropTypes.array,
  venues: PropTypes.array
}

export default App;
