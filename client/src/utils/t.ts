import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { appProductsGet } from "./http/products";

// Гнучкий тип FetchType для динамічного використання даних
type FetchType<T, P = void> = (params?: P) => Promise<{ [key: string]: any }>;

// Функція t, яка адаптує динамічні ключі для { array, count }
const T = <T, P>(
  fetch: FetchType<T, P>,
  params?: P,
  arrayKey: string = "array", // Назва ключа для масиву
  countKey: string = "count" // Назва ключа для кількості
) => {
  const [array, setArray] = useState<T[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Отримуємо дані
        const result = await fetch(params);

        // Мапимо динамічні ключі на { array, count }
        setArray(result[arrayKey] || []); // Якщо масив не існує, то використовуємо []
        setCount(result[countKey] || 0); // Якщо кількість не існує, то використовуємо 0
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params, fetch, arrayKey, countKey]); // Залежності включають назви ключів

  return { array, count, loading, error };
};

const T2 = () => {
  const { array, count, loading, error } = T(
    appProductsGet,
    {},
    "products", // Динамічний ключ для масиву
    "productCounts" // Динамічний ключ для кількості
  );
};
