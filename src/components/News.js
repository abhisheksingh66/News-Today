import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Lloading from './Lloading';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import {v4 as uuidv4} from 'uuid';


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitallize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitallize(this.props.category)} - NewsMonkey`
  }
  async updateNews() {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9405a95200e941c385c5ef7212f662f0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url)
    this.props.setProgress(30)
    let parsedata = await data.json()
    this.props.setProgress(70)
    this.setState({ articles: parsedata.articles, totalResults: parsedata.totalResults, loading: false })
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.updateNews()

  }

  //    handelPrevClick=async ()=>{
  // this.setState({page: this.state.page-1});
  // this.updateNews()
  //   }

  //    handelNextClick=async ()=>{
  //     this.setState({page: this.state.page+1});
  //     this.updateNews()
  //   }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9405a95200e941c385c5ef7212f662f0&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url)
    let parsedata = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedata.articles),
      totalResults: parsedata.totalResults,
    })
  };
  render() {
    return (
      <>
    

        <h1 className='text-center shadow p-3 mb-5 bg-body-tertiary rounded ' style={{ margin: '30px 0px' }}>NewsMonkey - Top {this.capitallize(this.props.category)} Headlines</h1>
        {this.state.loading && <Lloading />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
        // loader={<Lloading/>}
        >

          <div className="container">

            <div className="row">
              {this.state.articles.map((element) => {

                return <div className="col-md-4" key={uuidv4()}>
                  <NewsItem title={element.title ? element.title : ''} description={element.description ? element.description : ''} imageUrl={element.urlToImage } newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        

      </>
    )
  }
}

export default News
