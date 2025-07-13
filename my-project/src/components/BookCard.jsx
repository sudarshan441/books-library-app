import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../axios';

const BookCard = ({ book }) => {
  const { user } = useContext(AuthContext);

  const handleAdd = async () => {
    if (!user) return alert('Please login to add books');
    await axios.post(`/mybooks/${book._id}`);
    alert('Added to My Books!');
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <img src={book.coverImage} alt={book.title} className="w-full h-60 object-cover rounded" />
      <h2 className="text-lg font-bold mt-2">{book.title}</h2>
      <p className="text-sm text-gray-600">{book.author}</p>
      <button onClick={handleAdd} className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">
        Want to Read
      </button>
    </div>
  );
};

export default BookCard;
