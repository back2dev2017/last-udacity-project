import React, { Component } from 'react';

class Map extends Component {

  componentDidUpdate() {
    let tmpmarkers = this.props.markers
    let tmplocs = this.props.showitems
    for (let i = 0; i < tmpmarkers.length; i++) {
      // tmpmarkers[i].setMap(null);
      let tlookup = tmplocs.filter(showloc => {
        return showloc.venue.id === tmpmarkers[i].FSid
      })
      if (tlookup.length > 0) {
        tmpmarkers[i].setMap(this.props.mapref)
      } else {
        tmpmarkers[i].setMap(null)
      }
    }
  }

  render() {
    // console.log('should have all books', myBooks)

    return(
      <div id='mapg'>
        <h2 id='mapsectionmsg'>Please be patient, map is loading</h2>
      </div>
    );
  }

}

export default Map

