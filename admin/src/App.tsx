import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
// import { dataProvider } from "./dataProvider";
import ProductsList from "./components/products/ProductsList.tsx";
import { customDataProvider } from "./providers/simpleRestProvider.ts";
import resAuthProvider from "./providers/resAuthProvider.ts";
import ProductsShow from "./components/products/ProductsShow.tsx";
import CategoriesList from "./components/categories/CategoriesList.tsx";
import CategoriesShow from "./components/categories/CategoriesShow.tsx";
import ProductsCreate from "./components/products/ProductsCreate.tsx";
import SubcategoriesList from "./components/subcategories/SubcategoriesList.tsx";
import SubcategoriesShow from "./components/subcategories/SubcategoriesShow.tsx";
import CustomLogin from "./components/CustomLogin.tsx";
import CredentialsList from "./components/credentials/CredentialsList.tsx";
import CredentialsShow from "./components/credentials/CredentialsShow.tsx";
import CredentialsCreate from "./components/credentials/CredentialsCreate.tsx";
import CredentialsEdit from "./components/credentials/CredentialsEdit.tsx";
import CustomersList from "./components/customers/CustomersList.tsx";
import CustomersShow from "./components/customers/CustomersShow.tsx";
import CustomersEdit from "./components/customers/CustomersEdit.tsx";
import MediaShow from "./components/media/MediaShow.tsx";
import MediaCreate from "./components/media/MediaCreate.tsx";
import MediaList from "./components/media/MediaList.tsx";
import CategoriesCreate from "./components/categories/CategoriesCreate.tsx";
import WishlistList from "./components/wishlist/WishlistList.tsx";
import CartList from "./components/cart/CartList.tsx";
import ProductsEdit from "./components/products/ProductsEdit.tsx";
import AddressesList from "./components/addresses/AddressesList.tsx";
import CategoriesEdit from "./components/categories/CategoriesEdit.tsx";
import ReviewsList from "./components/reviews/ReviewsList.tsx";

export const App = () => (
	<Admin
		layout={Layout}
		dataProvider={customDataProvider}
		authProvider={resAuthProvider}
		loginPage={CustomLogin}
	>
		<Resource
			name="catalog/products"
			options={{ label: "Products" }}
			list={ProductsList}
			edit={ProductsEdit}
			create={ProductsCreate}
			show={ProductsShow}
		/>
		<Resource
			name="catalog/categories"
			options={{ label: "Categories" }}
			list={CategoriesList}
			create={CategoriesCreate}
			edit={CategoriesEdit}
			show={CategoriesShow}
		/>
		<Resource
			name="catalog/subcategories"
			options={{ label: "Subcategories" }}
			list={SubcategoriesList}
			show={SubcategoriesShow}
		/>
		<Resource
			name="user/credentials"
			options={{ label: "Credentials" }}
			list={CredentialsList}
			show={CredentialsShow}
			create={CredentialsCreate}
			edit={CredentialsEdit}
		/>
		<Resource
			name="user/customers"
			options={{ label: "Customers" }}
			list={CustomersList}
			show={CustomersShow}
			// create={CredentialsCreate}
			edit={CustomersEdit}
		/>
		<Resource
			name="catalog/media"
			options={{ label: "media" }}
			list={MediaList}
			create={MediaCreate}
			show={MediaShow}
			// edit={CustomersEdit}
		/>
		<Resource
			name="user/addresses"
			options={{ label: "addresses" }}
			list={AddressesList}
			// create={MediaCreate}
			// show={MediaShow}
			// edit={CustomersEdit}
		/>
		<Resource
			name="review"
			options={{label:"Reviews"}}
			list={ReviewsList}
			// create={MediaCreate}
			// show={MediaShow}
			// edit={CustomersEdit}
		/>

		<Resource
			name={"user/cart"}
			options={{ label: "cart" }}
			list={CartList}
		/>
		<Resource
			name={"user/wishlists"}
			options={{ label: "wishlists" }}
			list={WishlistList}
		/>
	</Admin>
);
