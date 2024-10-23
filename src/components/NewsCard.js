import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import pb from "../lib/pocketbase";

const NewsCard = () => {
    const [newsItems, setNewsItems] = useState([]);
    const navigate = useNavigate();  // Initialize the hook for navigation

    useEffect(() => {
        // Fetch the latest news items, sorted by 'created' in descending order
        const fetchNews = async () => {
            try {
                const records = await pb.collection('News').getList(1, 2, { // Adjust this limit to fetch more items if needed
                    sort: '-Date', // Sort by created date in descending order
                });
                setNewsItems(records.items); // Save the news items in state
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, []);

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    const handleMoreNewsClick = () => {
        navigate('/news');  // Navigate to the /news page
    };

    if (!newsItems.length) {
        return <div className="news-placeholder">No news available</div>;
    }

    return (
        <aside className="news-card">
            <h3 className="section-title">Latest News</h3>
            <div className="news-list">
                {newsItems.map((item, index) => (
                    <div key={index} className="news-item">
                        {item.Img_link && <img src={item.Img_link} alt={item.Headline} className="news-thumbnail" />}
                        <div className="news-info">
                            <h4 className="news-title">
                                <a href={item.Link} target="_blank" rel="noopener noreferrer">
                                    {truncateText(item.Headline, 50)}  {/* Truncate headline to 50 characters */}
                                </a>
                            </h4>
                            <p className="news-date">{new Date(item.Date).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="more-news-btn" onClick={handleMoreNewsClick}>More News</button>  {/* "More News" button */}
        </aside>
    );
};

export default NewsCard;
