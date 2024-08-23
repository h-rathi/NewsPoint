import React, { Component } from 'react'


export class Heading extends Component {
  
  constructor(){
    super();
    
  }
  render() {
    
    
    let {Head,desc,lnk}=this.props;
    return (
        
      <>
     
            <div className="card" style={{ width: '18rem' }}>
              <img src={this.props.img} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{this.props.tl}  
                    
                </h5>
                <p className="card-text">{this.props.ds.slice(0,96)}...</p>
                
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

