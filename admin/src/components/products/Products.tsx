import { useEffect, useState } from "react";

const Products = () => {
	const [products, setProducts] = useState();

	useEffect(() => {
		fetch("http://localhost:3030/products")
			.then(async (res) => await res.json())
			.then((data) => {
				if (!data.ok || data.status !== 200) throw new Error(data.statusText);

				setProducts(data);
			});
	}, []);

	console.log(products);

	return <div>test</div>;
};

export default Products;
