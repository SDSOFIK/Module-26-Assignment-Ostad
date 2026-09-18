import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useNewsStore from '../store/newsStore';
import api from '../services/api';
import Loader from '../Components/Loader';

const Dashboard = () => {
  const { user, updateUser } = useAuthStore();
  const { myNews, fetchMyNews, deleteNews, loading } = useNewsStore();

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    photo: user?.photo || '',
  });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchMyNews();
  }, []);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put('/users/profile', profileData);
      updateUser({ ...user, ...data });
      setMsg('Profile updated successfully!');
    } catch (err) {
      setMsg('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this news?')) {
      await deleteNews(id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
      {/* Profile Section */}
      <section>
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        {msg && <p className="text-green-600 mb-4">{msg}</p>}

        <form onSubmit={handleProfileUpdate} className="space-y-4 max-w-lg">
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleProfileChange}
            placeholder="Name"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleProfileChange}
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            type="text"
            name="photo"
            value={profileData.photo}
            onChange={handleProfileChange}
            placeholder="Photo URL"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleProfileChange}
            placeholder="Bio"
            rows="3"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>
      </section>

      {/* My News Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My News</h2>
          <Link
            to="/create-news"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700"
          >
            + Write News
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="space-y-4">
            {myNews.map((news) => (
              <div
                key={news._id}
                className="flex justify-between items-center border border-gray-200 rounded-md p-4"
              >
                <div>
                  <h3 className="font-semibold">{news.title}</h3>
                  <span className="text-sm text-gray-500">{news.category}</span>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/edit-news/${news._id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(news._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {myNews.length === 0 && (
              <p className="text-gray-500">আপনি এখনো কোনো নিউজ পাবলিশ করেননি।</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;