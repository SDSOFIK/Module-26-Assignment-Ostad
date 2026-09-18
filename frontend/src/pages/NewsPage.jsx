import { useEffect } from 'react';
import useNewsStore from '../store/newsStore';
import NewsCard from '../Components/NewsCard';
import Loader from '../Components/Loader';

const NewsPage = () => {
  const { newsList, fetchAllNews, loading } = useNewsStore();

  useEffect(() => {
    fetchAllNews();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">সকল সংবাদ</h1>

      {loading ? (
        <Loader />
      ) : newsList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.map((news) => (
            <NewsCard key={news._id} news={news} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">কোনো সংবাদ পাওয়া যায়নি।</p>
      )}
    </div>
  );
};

export default NewsPage;