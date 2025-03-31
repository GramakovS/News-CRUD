import { FC } from 'react';

import { NewsItem as NewsItemType } from '../../types/news';
import './NewsItem.css';

interface NewsItemProps {
  news: NewsItemType;
  onEdit: (news: NewsItemType) => void;
  onDelete: (id: number) => void;
}

const NewsItem: FC<NewsItemProps> = ({ news, onEdit, onDelete }) => {
  return (
    <div className="news-item">
      <h3>{news.title}</h3>
      <p>{news.content}</p>
      <div className="news-actions">
        <button onClick={() => onEdit(news)}>Редактировать</button>
        <button onClick={() => onDelete(news.id)}>Удалить</button>
      </div>
    </div>
  );
};

export default NewsItem;
