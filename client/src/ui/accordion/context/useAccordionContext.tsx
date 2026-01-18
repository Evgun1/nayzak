import React, {
	createContext,
	useContext,
	ReactNode,
	Dispatch,
	SetStateAction,
	useState,
} from "react";

interface AccordionContextType {
	active: boolean;
	setActive: Dispatch<SetStateAction<boolean>>;
}

const AccordionContext = createContext<AccordionContextType | undefined>(
	undefined,
);

export const AccordionProvider = ({ children }: { children: ReactNode }) => {
	const [active, setActive] = useState<boolean>(false);

	return (
		<AccordionContext.Provider
			value={{ active: active, setActive: setActive }}
		>
			{children}
		</AccordionContext.Provider>
	);
};

export const useAccordionContext = () => {
	const context = useContext(AccordionContext);
	if (!context) {
		throw new Error(
			"useAccordionContext must be used within AccordionProvider",
		);
	}
	return context;
};
