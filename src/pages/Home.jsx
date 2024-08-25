import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import Product from '../components/Product';

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);  // Optional: For error handling

  async function fetchProductData() {
    setLoading(true);
    setError(null);  // Reset error on new fetch attempt

    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch products. Please try again.");
      setPosts([]);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>{error}</div>
      ) : posts.length > 0 ? (
        <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]'>
          {posts.map((post) => (
            <Product key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className='flex justify-center items-center'>
          <p>No Products Found</p>
        </div>
      )}
    </div>
  );
};

export default Home;
