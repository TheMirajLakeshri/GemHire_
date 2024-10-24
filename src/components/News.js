import React, { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './News.css'; // Adjust the styling as needed

const pb = new PocketBase('https://gemhire.pockethost.io');

const NewsPage = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const news = await pb.collection('News').getList(1, 50, {
          sort: '-Date',
        });
        setNewsItems(news.items);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <p>Loading news...</p>;
  }

  // Filter news items that have predictions
  const predictedNews = newsItems.filter((newsItem) => newsItem.Prediction);

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    className: "center",
  };

  return (
    <div className="news-page">
      {predictedNews.length > 0 && (
        <div className="predictions-section">
          <h1 className='text-center'>Predictions</h1>
          <Slider {...carouselSettings}>
            {predictedNews.map((newsItem) => (
              <div key={newsItem.id} className="prediction-card">
                <div className="prediction-content">
                  <p>{newsItem.Prediction}</p> {/* Only showing the prediction */}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
      <div className='news-section'>
        <h1 className='text-center'>Latest News</h1>
        <ul className="news-list">
          {newsItems.map((newsItem) => (
            <li key={newsItem.id} className="news-item">
              <div className="img_div">
                {newsItem.Img_link && (
                  <div className="news-image">
                    <img src={newsItem.Img_link} alt={newsItem.Headline} />
                  </div>
                )}
              </div>
              <div>
                <h2><a href={newsItem.Link} target="_blank" rel="noopener noreferrer">{newsItem.Headline}</a></h2>
                <p><strong>Date:</strong> {newsItem.Date}</p>
                <p><strong>Source:</strong> {newsItem.Source}</p>
                <a href={newsItem.Link} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsPage;
