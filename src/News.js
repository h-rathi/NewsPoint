import React, { Component, useState } from 'react'
import Heading from './Heading'
import PropTypes from 'prop-types'

let pgSize=5;
// let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=94c20e941f034eb7b2138eae5a818a1a";
       
export class News extends Component {
  static defaultProps={
    category:'general',
    country:'india',
    pgSize:8
  }
  static propTypes={
    category:PropTypes.string,
    country:PropTypes.string
  }
  // Head=this.props;
   constructor(props){
    super(props);
    this.state={
      articles:[],
      spin:true,
      page:1,
      reslt:0,
      url:"https://newsapi.org/v2/top-headlines?country="+
      this.props.country+"&apiKey=94c20e941f034eb7b2138eae5a818a1a&pagesize="
      +this.props.pgSize+"&category="+this.props.category ,
      cnt:0,
      dsbl:false,
      dsbl1:true
    }
   }

  
   
  async hi(){
    console.log("running -- ", this.count,"times")

    // console.log("run only once")
    console.log(this.Head,'do',this.Head)
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
    
    let ctl=this.state.reslt/this.props.pgSize;
    // console.log(pgSize,'pgsize',url,this.state.url)
    this.setState({cnt:ctl})
    return y.articles;
    }
  async componentDidMount(){
    this.setState({url:"https://newsapi.org/v2/top-headlines?country="+
      this.props.country+"&apiKey=94c20e941f034eb7b2138eae5a818a1a&pagesize="
      +this.props.pgSize+"&category="+this.props.category+"&page="+this.state.page})
      
    const articles=await this.hi();
    this.setState({spin:false});
    this.setState({articles:articles})
    console.log('done')
    this.count++; 
  }

  hndlbtn=()=> {
    
    console.log('previous')
    console.log(this.reslt)
    if (this.state.page>1){
      this.setState({dsbl:false})
      this.setState({articles:[]})
      let pg=this.state.page-1
      this.setState({
                      page:pg
      }    ,this.componentDidMount)

      console.log(this.reslt)
      
    }
    else{
      this.setState({dsbl1:true})
      this.setState({})
    }
  }

  hndlbtn1=()=>{
    console.log('next')
    
    if (this.state.page<this.state.cnt){
      this.setState({dsbl1:false})
      this.setState({articles:[]})
      let pg=this.state.page+1
      // let nurl=this.state.url+'&page='+pg; url:nurl,
      this.setState({page:pg}
      ,
        this.componentDidMount)
      // console.log( pg, nurl, "nurl", this.state.url, this.state.page)
      
    }
    else{
      this.setState({dsbl:true})
    }
    
  }
   render() {
    return (

      <div className='container my-3' >
        <h2 style={{margin:'2vw 0vw 2vw 28vw'}}>News Point - Top Headlines</h2>
        
        <div className="row">
        {this.state.articles[0]==null? <div style={{marginLeft:'30vw',height:'15vw',width:'15vw'}} className="spinner-border" role="status">
  <span className="sr-only">Loading...</span>
</div>:console.log()}
        {
        this.state.articles.map((element) => {
          
          return <div className="col-md-4" key={element.url}>
            <Heading ul={element.url} img={element.urlToImage} ds={element.description} 
            tl={element.title} by={element.author} on={element.publishedAt} src={element.source.id}/>
            </div>

})          
    }       
 
        </div>
        
        <div className="container">
        <button type="button" onClick={this.hndlbtn} style={{marginLeft:'15vw',marginTop:
          '5vw',marginBottom:'5vw',borderRadius:'10%',backgroundColor:'red'}}
          className="btn btn-primary btn-lg" disabled={this.state.dsbl1} ><i className="fa-regular fa-hand-point-left fa-xl">
            
          </i>
          &nbsp;
          previous
          </button>
          <button type="button" onClick={this.hndlbtn1} style={{marginTop:
          '5vw',marginBottom:'5vw',marginLeft:'30vw', borderRadius:'10%',backgroundColor:'red'}}
          className="btn btn-primary btn-lg" disabled={this.state.dsbl}> next   &nbsp; 
          <i className="fa-regular fa-hand-point-right fa-xl"></i></button>
        </div>
        
      </div>
      
    )
    
  }
}

export default News
