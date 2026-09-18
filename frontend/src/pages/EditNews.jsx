import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useNewsStore from '../store/newsStore';
import Loader from '../Components/Loader';

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { singleNews, fetchNewsById, updateNews } = useNewsStore();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetchNewsById(id);
  }, [id]);

  useEffect(() => {
    if (singleNews) {
      setFormData({
        title: singleNews.title,
        description: singleNews.description,
        image: singleNews.image,
        category: singleNews.category,
      });
    }
  }, [singleNews]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateNews(id, formData);
    navigate('/dashboard');
  };

  if (!formData) return <Loader size="large" />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Edit News</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        >
          <option value="">Select Category</option>
          <option value="International">International</option>
          <option value="Local">Local</option>
          <option value="Sports">Sports</option>
          <option value="Politics">Politics</option>
          <option value="Technology">Technology</option>
          <option value="Entertainment">Entertainment</option>
        </select>

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="8"
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700"
        >
          Update News
        </button>
      </form>
    </div>
  );
};

export default EditNews;