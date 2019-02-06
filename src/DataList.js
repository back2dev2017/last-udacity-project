import React, { Component } from 'react';

class DataList extends Component {

  render() {
    let showitems = this.props.showitems
    // console.log(showitems)
    return(
      <div id="datalistarea">
        <div id='srchdiv'>
          <label htmlFor='srchinput'>Filter List: </label>
          <input type="text" id='srchinput' placeholder="Seach for a place" onChange={this.props.mysrchfunc} value={this.props.srchval}/>
        </div>
        <div id="srchitems">
          <div className='srchitemsshow'>
            {showitems.map((tmpitem) => (
                  // <li key={tmpitem.venue.id} className='srchitemdata'>
                    <div className='srchitemdetail' key={tmpitem.venue.id}>
                      <button onClick={this.props.listclick} className='list-name' data-fsid={tmpitem.venue.id}>{tmpitem.venue.name}</button>
                      {/* <p className='list-name'>{tmpitem.venue.name}</p> */}
                      <p className='list-addr'>{tmpitem.venue.location.address}</p>
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

