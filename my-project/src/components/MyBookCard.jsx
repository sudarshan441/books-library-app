import axios from '../axios';
import { useState } from 'react';

const MyBookCard = ({ entry, onUpdate }) => {
  const { bookId, status, rating } = entry;

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    await axios.patch(`/mybooks/${bookId._id}/status`, { status: newStatus });
    onUpdate();
  };

  const handleRatingChange = async (e) => {
    const newRating = parseInt(e.target.value);
    await axios.patch(`/mybooks/${bookId._id}/rating`, { rating: newRating });
    onUpdate();
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <img src={bookId.coverImage} alt={bookId.title} className="w-full h-60 object-cover rounded" />
      <h2 className="text-lg font-bold mt-2">{bookId.title}</h2>
      <p className="text-sm text-gray-600">{bookId.author}</p>

      <div className="mt-2">
        <label>Status: </label>
        <select value={status} onChange={handleStatusChange} className="ml-2 border rounded px-2">
          <option>Want to Read</option>
          <option>Currently Reading</option>
          <option>Read</option>
        </select>
      </div>

      <div className="mt-2">
        <label>Rating: </label>
        <select value={rating || 0} onChange={handleRatingChange} className="ml-2 border rounded px-2">
          <option value={0}>Not Rated</option>
          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} ⭐</option>)}
        </select>
      </div>
    </div>
  );
};

export default MyBookCard;
