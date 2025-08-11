import {
	createContext,
	FC,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";

type NavbarContextProps = {
	addNavbarId: (navbarId: string) => void;
	navbarId: string[];
};

const NavbarContext = createContext<NavbarContextProps | undefined>(undefined);

export const NavbarProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [id, setId] = useState<string[]>([]);

	const addNavbarId = useCallback(
		(navbarId: string) => {
			if (id.includes(navbarId)) {
				return;
			}

			setId((prev) => [...prev, navbarId]);
		},
		[id],
	);

	return (
		<NavbarContext.Provider value={{ navbarId: id, addNavbarId }}>
			{children}
		</NavbarContext.Provider>
	);
};

export const useNavbar = () => {
	const context = useContext(NavbarContext);

	if (!context) {
		throw new Error("useNavbar must be used within a NavbarProvider");
	}
	return context;
};
