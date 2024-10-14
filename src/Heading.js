import React from 'react'

const Heading=(props)=> {

    let {by, on,src } =props;
    return (

      <>

        <div className="card" style={{ width: '18rem' }}>
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
        style={{left:'90%',zIndex:'1'}}>
    {src}
  </span>
          <img src={props.img} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{props.tl}

            </h5>
            <p className="card-text">{props.ds.slice(0, 96)}...</p>
            <p className="card-text"><small className="text-body-secondary">by {by} on {new Date(on).toDateString()} </small></p>
            
            <a href={props.ul} target="_blank" rel="noopener noreferrer" className="btn btn-primary"
            >
              Click to read all details

            </a>

          </div>
        </div>

      </>
    )
  
}

export default Heading

