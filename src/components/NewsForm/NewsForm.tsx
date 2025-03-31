import { useState, useEffect, FC, FormEvent } from 'react';

import { NewsItem } from '../../types/news';
import './NewsForm.css';

interface NewsFormProps {
  onSubmit: (news: NewsItem) => void;
  editingNews: NewsItem | null;
  onCancel: () => void;
}

const NewsForm: FC<NewsFormProps> = ({ onSubmit, editingNews, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingNews) {
      setTitle(editingNews.title);
      setContent(editingNews.content);
    }
  }, [editingNews]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: editingNews ? editingNews.id : Date.now(),
      title,
      content,
    });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="news-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок новости"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Текст новости"
        required
      />
      <div className="form-actions">
        <button type="submit">{editingNews ? 'Сохранить' : 'Добавить'}</button>
        {editingNews && (
          <button type="button" onClick={onCancel}>
            Отмена
          </button>
        )}
      </div>
    </form>
  );
};

export default NewsForm;
