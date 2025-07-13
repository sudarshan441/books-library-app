import { useEffect, useState } from 'react';
import axios from '../axios';
import MyBookCard from '../components/MyBookCard';

const MyBooks = () => {
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBooks = () => {
    axios.get('/mybooks')
      .then(res => setMyBooks(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMyBooks();
  }, []);

  if (loading) return <p className="p-4">Loading your books...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {myBooks.map(entry => (
        <MyBookCard key={entry._id} entry={entry} onUpdate={fetchMyBooks} />
      ))}
    </div>
  );
};

export default MyBooks;
