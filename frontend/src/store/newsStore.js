import { create } from 'zustand';
import api from '../services/api';

const useNewsStore = create((set) => ({
  newsList: [],
  topNews: [],
  myNews: [],
  singleNews: null,
  breakingNews: null,
  internationalNews: [],
  localNews: [],
  loading: false,
  error: null,

  fetchAllNews: async (category = '') => {
    set({ loading: true });
    try {
      const { data } = await api.get('/news');
      const result = category
        ? data.filter((n) => n.category.toLowerCase() === category.toLowerCase())
        : data;
      set({ newsList: result, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchTopNews: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get('/news/top');
      set({ topNews: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchBreakingNews: async () => {
    try {
      const { data } = await api.get('/news');
      if (data.length > 0) {
        set({ breakingNews: data[0] }); // সবচেয়ে latest news
      }
    } catch (err) {
      set({ error: err.message });
    }
  },

  fetchByCategory: async (category, key) => {
    try {
      const { data } = await api.get('/news');
      const filtered = data.filter(
        (n) => n.category.toLowerCase() === category.toLowerCase()
      );
      set({ [key]: filtered });
    } catch (err) {
      set({ error: err.message });
    }
  },

  fetchNewsById: async (id) => {
    set({ loading: true, singleNews: null });
    try {
      const { data } = await api.get(`/news/${id}`);
      set({ singleNews: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchMyNews: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get('/news/my-news');
      set({ myNews: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  createNews: async (newsData) => {
    const { data } = await api.post('/news', newsData);
    set((state) => ({ myNews: [data, ...state.myNews] }));
    return data;
  },

  updateNews: async (id, newsData) => {
    const { data } = await api.put(`/news/${id}`, newsData);
    set((state) => ({
      myNews: state.myNews.map((n) => (n._id === id ? data : n)),
    }));
    return data;
  },

  deleteNews: async (id) => {
    await api.delete(`/news/${id}`);
    set((state) => ({
      myNews: state.myNews.filter((n) => n._id !== id),
    }));
  },
}));

export default useNewsStore;