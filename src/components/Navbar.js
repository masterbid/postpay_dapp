import React, { Component } from 'react'
import Identicon from 'identicon.js'

export default class Navbar extends Component {
     
  render() {
    return (
        <nav className="navbar navbar-dark fixed-top bg-secondary flex-md-nowrap p-0 shadow">
            <a
              className="navbar-brand col-sm-3 col-md-2 mr-0 text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Post Pay
            </a>
            <ul className="navbar-nav px-3">
              <li className="nav-item text-nowrap text-white d-none d-sm-block">
                <small id="account">
                    {this.props.wallet && 
                        <img className='ml-2' width='30' height="30" src={`data:image/png;base64,${new Identicon(this.props.wallet, 30).toString()}`} />
                    }
                  &nbsp;
                  <i>{this.props.wallet || 'Wallet Address Loading ....'}</i> 
                  </small>
              </li>
            </ul>
        </nav>
    )
  }
}
