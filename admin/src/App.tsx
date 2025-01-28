import "./App.css";
import Products from "./components/products/Products.tsx";
import { Toolbar } from "./components/toolpad/Toolbar.tsx";

function App() {
	return (
		<Toolbar>
			<Toolbar.Content
				label="Produsts Lins"
				vie={() => <Products />}
			/>
		</Toolbar>
	);
}

export default App;
