import { TextClassList } from "../../types/textClassList";
import classes from "./Orders.module.scss";

type OrdersType = {
  numberProduct: number;
  data: string;
  status: string;
  price: number;
};

const ORDERS_DATA: OrdersType[] = [
  {
    numberProduct: 98224,
    data: "July 24, 2022",
    price: 28.0,
    status: "Delivered",
  },
  {
    numberProduct: 98224,
    data: "July 24, 2022",
    price: 28.0,
    status: "Delivered",
  },
  {
    numberProduct: 98224,
    data: "July 24, 2022",
    price: 28.0,
    status: "Delivered",
  },
  {
    numberProduct: 98224,
    data: "July 24, 2022",
    price: 28.0,
    status: "Delivered",
  },
  {
    numberProduct: 98224,
    data: "July 24, 2022",
    price: 28.0,
    status: "Delivered",
  },
  {
    numberProduct: 98224,
    data: "July 24, 2022",
    price: 28.0,
    status: "Delivered",
  },
];

export default function Orders() {
  return (
    <ul>
      {ORDERS_DATA &&
        ORDERS_DATA.length > 0 &&
        ORDERS_DATA.map((order, index) => (
          <li key={index} className={classes.orders}>
            <span
              className={`${TextClassList.SEMIBOLD_18} ${classes.orders__number}`}
            >
              #{order.numberProduct}
            </span>
            <div
              className={`${TextClassList.REGULAR_18} ${classes.orders__data}`}
            >
              {order.data}
            </div>
            <div
              className={`${TextClassList.REGULAR_18} ${classes.orders__status}`}
            >
              {order.status}
            </div>
            <div
              className={`${TextClassList.REGULAR_18} ${classes.orders__price}`}
            >
              ${order.price}
            </div>
            <button className={classes.orders__btn}>Track</button>
          </li>
        ))}
    </ul>
  );
}
