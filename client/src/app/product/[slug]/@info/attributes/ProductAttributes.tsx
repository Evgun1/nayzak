import React, { FC } from "react";

interface ProductAttributesProps {
	// attributes: { name: string; value: string }[];
}

const ProductAttributes: FC<ProductAttributesProps> = (props) => {
	return (
		<div>
			{/* {attributes.map((attr, idx) => (
                    <li key={idx}>
                        <strong>{attr.name}:</strong> {attr.value}
                    </li>
                ))} */}
		</div>
	);
};

export default ProductAttributes;
