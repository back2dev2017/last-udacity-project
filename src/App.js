import React, { Component } from 'react';
import './App.css';
import Map from './Map.js';
import DataList from './DataList.js';
import axios from 'axios';

class App extends Component {
  state = {
    myFSdata: [],
    myshowdata: [],
    mylistdata: [],
    mymarkers: [],
    gmapref: {},
    showbiginfo: true,
    showlocdetail: {},
    srchstr: ""
  }

  componentDidMount() {
    this.getplacesinfo()
  }

  addFSdata = (retinfo) => {
    this.setState({
      myFSdata: retinfo.data.response.groups[0].items
    });
  }

  myloadmap = () => {
    // console.log("I would have tried to load the map now")
    myloadscript("https://maps.googleapis.com/maps/api/js?v=3&libraries=geometry&key=AIzaSyBHl4UjPFrXK9rY-PDvL6h3GBNocxkOHz8&callback=initMap")
    window.initMap = this.initMap
  }

  getplacesinfo = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parms = {
      client_id: "DRSZ2WAPQPYD5SBZOU43N3OLG0YT0SNYYSX4YJ14IOQO2MVU",
      client_secret: "GQTA3AB3UV5151GSQ3HK4QXD2CADS3OF0AO3QBP4BHFO2O55",
      ll: "38.625017,-90.184780",
      radius: "3000",
      v: "20182507"
    }
    const fsparms = new URLSearchParams(parms)
    axios.get(endPoint + fsparms)
      .then(response => {
        // to get data in a usable form, pull out the "real" data of the array
        this.setState({
          myFSdata: response.data.response.groups[0].items
        }, this.myloadmap())
        this.setState({
          mylistdata: this.state.myFSdata,
          myshowdata: this.state.myFSdata
        })
        // console.log(this.state.myFSdata)
      })
      .catch(errinfo => {
        console.log('Error - Udacity is the error - ' + errinfo)
        this.setState({
          myFSdata: [],
          myshowdata: [],
          mymarkers: [],
          mylistdata: []
        })
      })
  }

  initMap = () => {
    let tmpmarkers = []
    var map = new window.google.maps.Map(document.getElementById('mapg'), {
      center: {lat: 38.625017, lng: -90.184780},
      zoom: 15
    })

    var infowindow = new window.google.maps.InfoWindow()
    this.state.myFSdata.map(mydataitem => {
      var popupinfo = `<div id="infowin"><h3>${mydataitem.venue.name}</h3>` + 
                      `<p>Category: ${mydataitem.venue.categories[0].name}</p>` +
                      `<p> ${mydataitem.venue.location.formattedAddress}` + 
                      `</div>`
      var marker = new window.google.maps.Marker({
        position: {lat: mydataitem.venue.location.lat, lng: mydataitem.venue.location.lng},
        map: map,
        title: mydataitem.venue.name
      })
      marker.addListener('click', function() {
        infowindow.setContent(popupinfo)
        infowindow.open(map,marker)
        // window.App.mymarkerclick()
      })
      // add a prop to each marker to link it to the FourSquare data - aka the id value from FS
      marker.FSid = mydataitem.venue.id
      tmpmarkers.push(marker)
      return true
    })
    this.setState({
      mymarkers: tmpmarkers,
      gmapref: map
    })
  }

  mysrchplace =  evt => {
    let tmpsrchstr = evt.target.value
    let tmpdata = this.state.myFSdata
    if (tmpsrchstr === '' || tmpsrchstr === undefined) {
      this.setState({
        myshowdata: this.state.myFSdata,
        srchstr: ''
      })
    } else {
      // console.log(tmpdata)
      let newdata = tmpdata.filter((tmpitem) => {
        return tmpitem.venue.name.toLowerCase().indexOf(tmpsrchstr.toLowerCase()) >= 0 ||
              tmpitem.venue.categories[0].name.toLowerCase().indexOf(tmpsrchstr.toLowerCase()) >= 0 ||
              tmpitem.venue.location.address.toLowerCase().indexOf(tmpsrchstr.toLowerCase()) >= 0 ||
              tmpitem.venue.categories[0].shortName.toLowerCase().indexOf(tmpsrchstr.toLowerCase()) >= 0
      })
      // console.log(newdata)
      this.setState({
        myshowdata: newdata,
        srchstr: tmpsrchstr
      })
    }
  }

  mysitepick = evt => {
    // let tmpbtnid = evt.target.id
    let tmpbtnid = evt.target.getAttribute('data-fsid')
    let tmpmarkers = this.state.mymarkers
    // console.log(tmpmarkers)
    for (let i=0; tmpmarkers.length; i++) {
      if (tmpmarkers[i].FSid === tmpbtnid) {
        // console.log('found the one clicked - ' + tmpmarkers[i].position)
        window.google.maps.event.trigger(tmpmarkers[i], 'click')
        // console.log(tmpmarkers[i])
        break
      }
    }
  }

  render() {
    return (
      <div className="App">
        <main className = "onscreen">
          <div id="listing">
            <DataList mymsg={this.state.fomsg} showitems={this.state.myshowdata} srchval={this.state.srchstr} mysrchfunc={this.mysrchplace} listclick={this.mysitepick}/>
          </div>
          <div id="maparea">
            <Map markers={this.state.mymarkers} showitems={this.state.myshowdata} mapref={this.state.gmapref}/>
          </div>
        </main>

      </div>
    );
  }
}

function myloadscript(url) {
  // where is the first "script" tag
  // console.log(url);
  var locplace = window.document.getElementsByTagName("script")[0];
  var newscript = window.document.createElement("script");
  newscript.src = url;
  newscript.async = true;
  newscript.defer = true;
  locplace.parentNode.insertBefore(newscript, locplace);
}
export default App;
