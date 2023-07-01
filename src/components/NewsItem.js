import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
  let  {title, description, imageUrl,newsUrl,author,date,source}=this.props
    return (
      <div className='my-3'>
        <div className="card" >
          <div style={{display:"flex",
                       justifyContent:"flex-end" ,
                       position:"absolute" ,
                       right:'0'           }}>
        <span className=" badge rounded-pill bg-danger" >
    {source}</span>
    </div>
  <img src={!imageUrl? "https://englishtribuneimages.blob.core.windows.net/gallary-content/2023/6/2023_6$largeimg_337748599.jpg":imageUrl} className="card-img-top" alt="..." onError={(e) => {e.target.src = 'https://englishtribuneimages.blob.core.windows.net/gallary-content/2023/6/2023_6$largeimg_337748599.jpg'; e.target.onError = null;}} />
  
  <div className="card-body">
    <h5 className="card-title">{title} </h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-body-secondary">By {!author?'Unknown':author} on {new Date(date).toGMTString()}</small></p>
    <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
