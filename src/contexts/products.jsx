import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { defaultQueryParameters } from '../components/Makeup';

export const productsContext = createContext({});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queryParameters, setQueryParameters] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      // Set isLoading state to true
      setIsLoading(true);

      try {
        // Make an API call using axios and the query parameters
        const response = await axios.get(
          `https://makeup-api.herokuapp.com/api/v1/products.json?${
            queryParameters || defaultQueryParameters
          }`
        );

        // Update the products state with the data from the API response
        setProducts(response.data.slice(0, 20));
      } finally {
        // Set isLoading state to false
        setIsLoading(false);
      }
    };

    fetchData();
  }, [queryParameters]);

  return (
    <productsContext.Provider
      value={{ products, isLoading, setQueryParameters }}
    >
      {children}
    </productsContext.Provider>
  );
};

export const useProductsStore = () => useContext(productsContext);
