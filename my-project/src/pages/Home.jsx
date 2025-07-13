import { useEffect, useState } from 'react';
import axios from '../axios';
import BookCard from '../components/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/books')
      .then(res => setBooks(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading books...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {books.map(book => <BookCard key={book._id} book={book} />)}
    </div>
  );
};

export default Home;
