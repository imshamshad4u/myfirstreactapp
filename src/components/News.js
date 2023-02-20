import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  constructor() {
    super();
    console.log("hello i ama constructor from news");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0

    }
  }
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a8de9c15f0194f3b92cca63f6a1b4c92&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true });
    let data = await fetch(url)
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }
  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a8de9c15f0194f3b92cca63f6a1b4c92&page=1&pageSize=${this.props.pageSize}`
    // this.setState({loading:true});
    // let data = await fetch(url)
    // let parsedData=await data.json();
    // console.log(parsedData);
    // this.setState({articles:parsedData.articles,
    //   totalResults:parsedData.totalResults,
    //   loading:false
    // })
    this.updateNews();
  }
  handlePrevClick = async () => {
    console.log("previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a8de9c15f0194f3b92cca63f6a1b4c92&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    // this.setState({loading:true});
    // let data = await fetch(url)
    // let parsedData=await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page:this.state.page-1,
    //   articles:parsedData.articles,
    //   loading:false
    // })
    this.setState({ page: this.state.page - 1 })
    this.updateNews();
  }
  handleNextClick = async () => {
    console.log("next");
    //   if(!(this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize))){
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a8de9c15f0194f3b92cca63f6a1b4c92&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    //     this.setState({loading:true});
    //     let data = await fetch(url)
    //     let parsedData=await data.json();
    //     console.log(parsedData);
    //     this.setState({
    //       page:this.state.page+1,
    //       articles:parsedData.articles,
    //       loading:false
    //     })
    // }
    this.setState({ page: this.state.page + 1 })
    this.updateNews();
  }
  fetchMoreData = async () => {

    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a8de9c15f0194f3b92cca63f6a1b4c92&page=${this.state.page}&pageSize=${this.props.pageSize}`
    // this.setState({ loading: true });
    let data = await fetch(url)
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      // loading: false
    })
  };
  render() {
    return (
      <>
        <h1 className='text-center' style={{ margin: '35px 0px',marginTop:'90px' }}>ExpressNews - Latest Headlines</h1>
        {this.state.loading&&<Spinner/>}
        {/* {this.state.loading&&<Spinner/>}
        <div className="row">
          {!this.state.loading&& this.state.articles.map((element) => {

            return <div className="col-md-4" key={element.url}>
              <NewsItems title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} 
              newsUrl={element.url} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
        </div> */}
        {/* {this.state.loading&&<Spinner/>} */}
        {/* this below one is modified from above element if we do not want infinite scroll then use above code otherwise use below one */}
        {/* line 99 to 107 is forr infinite scroll and 86 to 95 is for regular prev and next wala */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {

                return <div className="col-md-4" key={element.url}>
                  <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                    newsUrl={element.url} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* commented waala privious and next button hai jo news dusre page pr dikhata hai  */}
        {/* <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page <= 1} className=" btn btn-dark" onClick={this.handlePrevClick}>&larr;previous</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>next &rarr;</button>
        </div> */}
      </>
    )
  }
}






