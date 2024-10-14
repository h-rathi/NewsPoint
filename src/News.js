import React, { Component, useState } from 'react'
import Heading from './Heading'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
let pgSize = 5;
// let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=94c20e941f034eb7b2138eae5a818a1a";

export class News extends Component {
  static defaultProps = {
    category: 'general',
    country: 'in',
    pgSize: 10
  }
  static propTypes = {
    category: PropTypes.string,
    country: PropTypes.string
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    if (this.props.category != "general")
      document.title = "NewsPoint -" + this.capitalizeFirstLetter(this.props.category);
    else {
      document.title = "news Point - read news daily for free"
    }
    this.state = {
      articles: [],
      spin: true,
      srt:false,
      page: 1,
      reslt: 0,
      url: "https://newsapi.org/v2/top-headlines?country=" +
        this.props.country + "&apiKey=94c20e941f034eb7b2138eae5a818a1a&pagesize="
        + this.props.pgSize + "&category=" + this.props.category,
      cnt: 0,
      dsbl: false,
      dsbl1: true,
      lstfnl: []
    }
  }

  mr1 = async () => {
    let npage = this.state.page + 1
  
    let url = "https://newsapi.org/v2/top-headlines?country=" +
      this.props.country + "&apiKey=94c20e941f034eb7b2138eae5a818a1a&pagesize="
      + this.props.pgSize + "&category=" + this.props.category + "&page=" + npage;
    let x = await fetch(url)
    let y = await x.json()
    y.articles.forEach(element => {
      if (element.description == null) {
        element.description = "description unavailable";
      }
     
      if (element.urlToImage == null) {
        element.urlToImage = 'https://gizmodo.com/app/uploads/2024/07/Perseid.jpg';
      }
      if (element.title == null) {
        element.title = " ";
      }
      if (element.description == null) {
        element.description = " ";
      }
    });
    this.setState({
      articles: this.state.articles.concat(y.articles),
      page:npage
    })
  }

  hi=async () =>{
    let x = await fetch(this.state.url)
    let y = await x.json()
    
    y.articles.forEach(element => {
      if (element.description == null) {
        element.description = "description unavailable";
      }
      if (element.urlToImage == null) {
        element.urlToImage = 'https://gizmodo.com/app/uploads/2024/07/Perseid.jpg';
      }
      if (element.title == null) {
        element.title = " ";
      }
      if (element.description == null) {
        element.description = " ";
      }
    });
    this.setState({ reslt: y.totalResults })
   
    console.log(this.state.lstfnl)

    return y.articles;
  }
  async componentDidMount(props) {
    this.setState({
      url: "https://newsapi.org/v2/top-headlines?country=" +
        this.props.country + "&apiKey=94c20e941f034eb7b2138eae5a818a1a&pagesize="
        + this.props.pgSize + "&category=" + this.props.category + "&page=" + this.state.page
    })
    console.log('sher in comp')
    const articles = await this.hi();
    console.log('sher 2 in comp')
    let ctl = Math.ceil(this.state.reslt / this.props.pgSize);
    this.setState({ spin: false ,
      articles: articles,
      cnt: ctl
    });
  
  }

  render() {
    return (
      <>
        <h2 style={{ margin: '2vw 0vw 2vw 24vw' }}>News Point - Top {this.props.category == 'general' ? '' : this.props.category} Headlines</h2>
        <InfiniteScroll
            dataLength={this.state.articles.length} //This is important field to render the next data
            next={this.mr1}
            hasMore={this.state.page<this.state.cnt}
            loader={<h2 style={{marginLeft:'40vw',marginBottom:'10vw',marginTop:'5vw'}}>loading ..... </h2>}
            endMessage={this.state.page==this.state.cnt&&
              <p style={{ textAlign: 'center' ,marginBottom:'10vw',marginTop:'5vw'}}>
                <h2 ><b>Yay! You have seen it all</b></h2>
              </p>
            }>
              <div className="container my-3">
        <div className="row">

          {this.state.articles[0] == null ? <div style={{ marginLeft: '30vw', height: '15vw', width: '15vw' }} className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div> : console.log()}
          
            {
              this.state.articles.map((element) => {

                return <div className="col-md-4" key={element.url}>
                  <Heading ul={element.url} img={element.urlToImage} ds={element.description}
                    tl={element.title} by={element.author} on={element.publishedAt} src={element.source.id} />
                </div>

              })
            }
        </div>
        </div>
        </InfiniteScroll>
      </>
    )
  }
}
export default News
