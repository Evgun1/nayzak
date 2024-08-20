import { ButtonClassList } from "@/types/buttonClassList";
import { Product } from "@/types/product";
import { TextClassList } from "@/types/textClassList";
import DisplayIcon from "../elemets/icons/displayIcon";
import IconsIdList from "../elemets/icons/IconsIdList";
import { FC } from "react";

type CartProductProps = {
  products: Product[];
};

const CartProducts: FC<CartProductProps> = ({ products }) => {
  return (
    <>
      {products &&
        products.length > 0 &&
        products.map((product, index) => (
          <div key={index}>
            <div>
              <img src="https://placehold.co/652x889" alt="" />
              <div>
                <span className={TextClassList.SEMIBOLD_14}>
                  {product.title}
                </span>
                <span className={TextClassList.REGULAR_12}>
                  {product.description}
                </span>
                <button className={` ${ButtonClassList.BUTTON_XSMALL}`}>
                  <DisplayIcon iconName={IconsIdList.TRASH} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
            <div>{product.amount}</div>
            <span>${product.mainPrice}</span>
            <span>${product.mainPrice * (product.amount as number)}</span>
          </div>
        ))}
    </>
  );
};

export default CartProducts;
