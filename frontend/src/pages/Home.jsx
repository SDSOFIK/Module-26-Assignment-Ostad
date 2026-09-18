import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useNewsStore from '../store/newsStore';
import NewsCard from '../Components/NewsCard';
import Loader from '../Components/Loader';

const Home = () => {
  const {
    topNews,
    breakingNews,
    internationalNews,
    localNews,
    fetchTopNews,
    fetchBreakingNews,
    fetchByCategory,
    loading,
  } = useNewsStore();

  useEffect(() => {
    fetchBreakingNews();
    fetchTopNews();
    fetchByCategory('International', 'internationalNews');
    fetchByCategory('Local', 'localNews');
  }, []);

  return (
    <div>
      {/* 1. Breaking News Ticker */}
      {breakingNews && (
        <div className="bg-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-3">
            <span className="bg-white text-red-600 text-xs font-bold px-2 py-1 rounded shrink-0">
              BREAKING
            </span>
            <Link
              to={`/news/${breakingNews._id}`}
              className="text-sm font-medium truncate hover:underline"
            >
              {breakingNews.title}
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-3">সবার আগে সব খবর</h1>
        <p className="text-blue-100 mb-6">সঠিক তথ্য, নির্ভরযোগ্য সংবাদ</p>
        <Link
          to="/news"
          className="bg-white text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100"
        >
          সব সংবাদ দেখুন
        </Link>
      </section>

      {/* 2. Top News Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-blue-600 pl-3">
          Top News
        </h2>

        {loading ? (
          <Loader />
        ) : topNews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topNews.map((news) => (
              <NewsCard key={news._id} news={news} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">কোনো Top News পাওয়া যায়নি।</p>
        )}
      </section>

      {/* 3. International News Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold border-l-4 border-green-600 pl-3">
              International News
            </h2>
            <Link to="/news" className="text-blue-600 text-sm font-medium hover:underline">
              See All →
            </Link>
          </div>

          {internationalNews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {internationalNews.slice(0, 3).map((news) => (
                <NewsCard key={news._id} news={news} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">এই মুহূর্তে কোনো International News নেই।</p>
          )}
        </div>
      </section>

      {/* 4. Local News Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold border-l-4 border-orange-500 pl-3">
            Local News
          </h2>
          <Link to="/news" className="text-blue-600 text-sm font-medium hover:underline">
            See All →
          </Link>
        </div>

        {localNews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {localNews.slice(0, 3).map((news) => (
              <NewsCard key={news._id} news={news} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">এই মুহূর্তে কোনো Local News নেই।</p>
        )}
      </section>

      {/* 5. CTA Section */}
      <section className="bg-gray-100 py-12 text-center">
        <h2 className="text-2xl font-bold mb-3">নিজের খবর পাবলিশ করুন</h2>
        <p className="text-gray-600 mb-5">রেজিস্টার করে আজই নিজের নিউজ শেয়ার করুন</p>
        <Link
          to="/register"
          className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default Home;