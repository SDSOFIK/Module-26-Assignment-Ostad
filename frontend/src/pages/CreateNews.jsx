import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useNewsStore from '../store/newsStore';

const CreateNews = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { createNews } = useNewsStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createNews(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Write News</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="News Title"
          value={formData.title}
          onChange={handleChange}
          required
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
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
        <textarea
          name="description"
          placeholder="News Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="8"
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Publishing...' : 'Publish News'}
        </button>
      </form>
    </div>
  );
};

export default CreateNews;