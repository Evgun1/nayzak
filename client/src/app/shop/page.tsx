import { useRouter } from "next/router";
import { PageProps } from "../../../.next/types/app/layout";
import Header from "../../components/elemets/shop/header/Header";
import Products from "../../components/elemets/shop/products/Products";

export default function page(props: PageProps) {
  return (
    <>
      <section>
        <Header />
      </section>
      <section>
        <Products {...props} />
      </section>
    </>
  );
}
