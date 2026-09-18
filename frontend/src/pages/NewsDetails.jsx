import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useNewsStore from '../store/newsStore';
import Loader from '../Components/Loader';

const NewsDetails = () => {
  const { id } = useParams();
  const { singleNews, fetchNewsById, loading } = useNewsStore();

  useEffect(() => {
    fetchNewsById(id);
  }, [id]);

  if (loading || !singleNews) {
    return <Loader size="large" />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <span className="text-blue-600 font-semibold text-sm uppercase">
        {singleNews.category}
      </span>
      <h1 className="text-3xl font-bold mt-2 mb-4">{singleNews.title}</h1>

      <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
        <span>By {singleNews.author?.name || 'Unknown'}</span>
        <span>•</span>
        <span>{new Date(singleNews.createdAt).toLocaleDateString()}</span>
      </div>

      {singleNews.image && (
        <img
          src={singleNews.image}
          alt={singleNews.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />
      )}

      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {singleNews.description}
      </p>
    </div>
  );
};

export default NewsDetails;