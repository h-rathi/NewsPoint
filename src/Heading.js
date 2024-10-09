import React, { Component } from 'react'

export class Heading extends Component {

  constructor() {
    super();

  }
  render() {


    let { Head, desc, lnk, by, on,src } = this.props;
    return (

      <>

        <div className="card" style={{ width: '18rem' }}>
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
        style={{left:'90%',zIndex:'1'}}>
    {src}
    {/* <span className="visually-hidden">unread messages</span> */}
  </span>
          <img src={this.props.img} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{this.props.tl}

            </h5>
            <p className="card-text">{this.props.ds.slice(0, 96)}...</p>
            <p className="card-text"><small className="text-body-secondary">by {by} on {new Date(on).toDateString()} </small></p>
            
            <a href={this.props.ul} target="_blank" rel="noopener noreferrer" className="btn btn-primary"
            >
              Click to read all details

            </a>

          </div>
        </div>

      </>
    )
  }
}

export default Heading

