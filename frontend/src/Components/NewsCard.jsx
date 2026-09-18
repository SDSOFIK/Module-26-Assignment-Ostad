import { Link } from 'react-router-dom';

const NewsCard = ({ news }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src={news.image || 'https://via.placeholder.com/400x250?text=News'}
        alt={news.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <span className="text-xs font-semibold text-blue-600 uppercase">
          {news.category}
        </span>
        <h3 className="text-lg font-bold mt-1 line-clamp-2">{news.title}</h3>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {news.description}
        </p>
        <Link
          to={`/news/${news._id}`}
          className="inline-block mt-3 text-blue-600 font-medium hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;