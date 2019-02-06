import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map.js';
import DataList from './DataList.js';
import axios from 'axios';

class App extends Component {
  state = {
    myFSdata: [],
    mylistdata: [],
    srchstr: "",
    fomsg: "I hate Udacity with a horrible passion"
  }

  componentDidMount() {
    this.getplacesinfo()
  }

  addFSdata = (retinfo) => {
    this.setState({
      myFSdata: retinfo.data.response.groups[0].items
    });
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
          mylistdata: this.state.myFSdata
        })
        console.log(this.state.myFSdata)
      })
      .catch(errinfo => {
        console.log('Error - Fuck you Udacity - ' + errinfo)
        this.setState({
          mymapdata: ""
        })
      })
  }

  myloadmap = () => {
    console.log("I would have tried to load the map now")
    // myloadscript("https://maps.googleapis.com/maps/api/js?v=3&libraries=geometry&key=AIzaSyBHl4UjPFrXK9rY-PDvL6h3GBNocxkOHz8&callback=initMap")
    // window.initMap = this.initMap
  }

  render() {
    return (
      <div className="App">
      {/* //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header> */}
        <main className = "onscreen">
          <DataList mymsg={this.state.fomsg}/>
          <Map addFSdata = {this.addFSdata}/>
        </main>

      </div>
    );
  }
}

export default App;
