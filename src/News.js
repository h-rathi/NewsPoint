import React, { Component, useState } from 'react'
import Heading from './Heading'


let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=ebc4bc9ee53a46e284891dc5a1ef402b"
       
export class News extends Component {
   constructor(){
    super();
    this.state={
      articles:[],
      spin:true,
      page:1,
      reslt:0,
      url:"https://newsapi.org/v2/top-headlines?country=in&apiKey=ebc4bc9ee53a46e284891dc5a1ef402b",
      cnt:0,
      dsbl:"disabled"
    }
   }
   dsbl1="disabled";
  async hi(){
    let x=await fetch(this.state.url) 
    let y=await x.json()
    y.articles.forEach(element => {
      if (element.description==null){
        element.description="description unavailable";
      }
      if (element.urlToImage==null){
        element.urlToImage='https://gizmodo.com/app/uploads/2024/07/Perseid.jpg';
      }
      if (element.title==null){
        element.title=" ";
      }
      if (element.description==null){
        element.description=" ";
      }
      
    });
    console.log(y.totalResults,'rslt')
    this.setState({reslt:y.totalResults})
    console.log(this.state.reslt)
    if (this.state.reslt>12){
      console.log('greater')
    }
    let ctl=this.state.reslt/20
    this.setState({cnt:ctl})
    // console.log(Math.ceil(ctl))
    
    
    return y.articles;
    }
  async componentDidMount(){
    
    const articles=await this.hi();
    this.setState({spin:false});
    this.setState({articles:articles})
    
    console.log('done')
  }
  hndlbtn=()=> {
    
    console.log('previous')
    console.log(this.reslt)
    if (this.state.page>1){
      this.setState({articles:[]})
      let pg=this.state.page-1
      let nurl=url+'&page='+pg
      this.setState({url:nurl,
                      page:pg
      },this.componentDidMount)

      console.log(this.reslt)
      
    }
  }

  hndlbtn1=()=>{
    console.log('next')
    
    if (this.state.page<this.state.cnt){
      this.setState({articles:[]})
      let pg=this.state.page+1
      let nurl=url+'&page='+pg;
      this.setState({url:nurl,page:pg},this.componentDidMount)
    }
    else{
      this.setState({dsbl:true})
    }
    
  }
   render() {

    return (

      <div className='container my-3' >
        <h2>News Point - Top Headlines</h2>
        
        <div className="row">
        {this.state.articles[0]==null? <div style={{marginLeft:'30vw',height:'15vw',width:'15vw'}} className="spinner-border" role="status">
  <span className="sr-only">Loading...</span>
</div>:console.log()}
        {
        this.state.articles.map((element) => {
          
          return <div className="col-md-4" key={element.url}>
            <Heading ul={element.url} img={element.urlToImage} ds={element.description} 
            tl={element.title} />
            </div>

})          
    }       

            
        </div>
        
        <div className="container">
        <button type="button" onClick={this.hndlbtn} style={{marginLeft:'15vw',marginTop:
          '5vw',marginBottom:'5vw',borderRadius:'10%',backgroundColor:'red'}}
          className="btn btn-primary btn-lg"  ><i className="fa-regular fa-hand-point-left fa-xl">
            
          </i>
          &nbsp;
          previous 
          </button>
          <button type="button" onClick={this.hndlbtn1} style={{marginTop:
          '5vw',marginBottom:'5vw',marginLeft:'30vw', borderRadius:'10%',backgroundColor:'red'}}
          className="btn btn-primary btn-lg"> next   &nbsp; 
          <i className="fa-regular fa-hand-point-right fa-xl"></i></button>
        </div>
        
      </div>
      
    )
    
  }
}

export default News
