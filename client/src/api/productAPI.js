import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Ürünleri alırken hata:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Ürün ${id} alınırken hata:`, error);
    throw error;
  }
};
