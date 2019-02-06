import React, { Component } from 'react';

class DataList extends Component {

  recentermap = () => {
    let tspot = this.props.origcenter
    let topoint = new window.google.maps.LatLng(tspot.lat, tspot.lng)
    this.props.mapref.panTo(topoint)
  }

  render() {
    let showitems = this.props.showitems
    // console.log(showitems)
    return(
      <div id="datalistarea">
        <div id='srchdiv'>
          <label htmlFor='srchinput'>Filter List: </label>
          <input type="text" id='srchinput' placeholder="Seach for a place" onChange={this.props.mysrchfunc} value={this.props.srchval}/>
          <button id='btn-maprecenter' title='Recenter map' onClick={this.recentermap}>O</button>
        </div>
        <div id="srchitems">
          <div className='srchitemsshow'>
            {showitems.map((tmpitem) => (
                  // <li key={tmpitem.venue.id} className='srchitemdata'>
                    <div className='srchitemdetail' key={tmpitem.venue.id}>
                      <button 
                          className='list-name'                      
                          onClick={this.props.listclick} 
                          data-fsid={tmpitem.venue.id}>
                        {tmpitem.venue.name}
                      </button>
                      {/* <p className='list-name'>{tmpitem.venue.name}</p> */}
                      <p className='list-addr'>{tmpitem.venue.location.formattedAddress}</p>
                      <hr/>
                    </div>
                  // </li>
                ))
            }
          </div>
        </div>
      </div>

    );
  }

}

export default DataList

