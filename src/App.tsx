import { useState, useEffect, FC } from 'react';

import NewsItem from './components/NewsItem';
import NewsForm from './components/NewsForm';

import { NewsItem as NewsItemType } from './types/news';

const App: FC = () => {
  const [news, setNews] = useState<NewsItemType[]>([]);
  const [editingNews, setEditingNews] = useState<NewsItemType | null>(null);

  useEffect(() => {
    const savedNews = localStorage.getItem('news');
    if (savedNews) {
      setNews(JSON.parse(savedNews));
    }
  }, []);

  const saveToLocalStorage = (updatedNews: NewsItemType[]): void => {
    localStorage.setItem('news', JSON.stringify(updatedNews));
  };

  const handleSubmit = (newsItem: NewsItemType): void => {
    if (editingNews) {
      const updatedNews = news.map((item) => (item.id === newsItem.id ? newsItem : item));
      setNews(updatedNews);
      saveToLocalStorage(updatedNews);
      setEditingNews(null);
    } else {
      const updatedNews = [...news, newsItem];
      setNews(updatedNews);
      saveToLocalStorage(updatedNews);
    }
  };

  const handleEdit = (newsItem: NewsItemType): void => {
    setEditingNews(newsItem);
  };

  const handleDelete = (id: number): void => {
    const updatedNews = news.filter((item) => item.id !== id);
    setNews(updatedNews);
    saveToLocalStorage(updatedNews);
  };

  return (
    <div className="app">
      <h1>Новости</h1>
      <NewsForm
        onSubmit={handleSubmit}
        editingNews={editingNews}
        onCancel={() => setEditingNews(null)}
      />
      <div className="news-list">
        {news.map((item) => (
          <NewsItem key={item.id} news={item} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default App;
