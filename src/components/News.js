import React, { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import './News.css'; // You can style the page with this file

const pb = new PocketBase('https://gemhire.pockethost.io');

const NewsPage = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Fetch paginated news list (page 1, 50 records per page, sorting by creation date)
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

  return (
    <div className="news-page">
      <h1>Latest News</h1>
      <ul className="news-list">
        {newsItems.map((newsItem) => (
          <li key={newsItem.id} className="news-item">
            <div className='img_div'>
              {newsItem.Img_link && (
                <div className="news-image">
                  <img src={newsItem.Img_link} alt={newsItem.Headline} />
                </div>
              )}
            </div>
            <div>
              <h2><a href={newsItem.Link} target="_blank">{newsItem.Headline}</a></h2>
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
  );
};

export default NewsPage;

