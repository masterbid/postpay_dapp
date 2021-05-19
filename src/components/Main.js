import React, { Component } from 'react'
import Identicon from 'identicon.js'

export default class Main extends Component {
     
  render() {
    return (
        <div className="container-fluid mt-5">
            <div className="row">
              <main role="main" className="col-lg-12 mr-auto ml-auto" style={{ maxWidth: '500px'}}>
                <div className="content mr-auto ml-auto">
                    <br />
                    <form onSubmit={e => {
                        e.preventDefault()
                        this.props.createPost(this.postContent.value)
                    }}>
                        <div className="form-group mr-sm-2">
                            <input 
                                id="postContent"
                                type="text"
                                ref={input => this.postContent = input }
                                className="form-control"
                                placeholder="What's on your mind"
                                required
                            />
                            <button type="submit" className="btn btn-primary btn-block mt-2">Share</button>
                        </div>
                    </form><br />
                  { this.props.posts.map((post, key) => 
                    (
                      <div className="card mb-4" key={key}>
                        <div className="card-header">

                        <img className="mr-2" width='30' height="30" src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`} />
                          <small className="text-muted">{post.author}</small>
                        </div>
                        <ul id="postList" className="list-group list-group-flush">
                          <li className="list-group-item">
                            <p>{post.content}</p>
                          </li>
                          <li key={key} className="list-group-item py-2">
                            <small className="float-left mt-1 text-muted">
                              TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
                            </small>
                            <button
                                className="btn btn-link btn-sm float-right pt-0"
                                name={post.id}
                                onClick={e => {
                                let tipAmount = window.web3.utils.toWei('0.1','Ether')
                                this.props.tipPost(e.target.name, tipAmount)
                            }} className="btn btn-link btn-sm float-right pt-0">
                                TIP 0.1 ETH
                            </button>
                          </li>
                        </ul>
                      </div>
                    )
                  )}
                </div>
              </main>
            </div>
          </div>
    )
  }
}
