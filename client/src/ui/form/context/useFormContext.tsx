import React, {
	createContext,
	useContext,
	ReactNode,
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from "react";

interface FormContextType {
	errors: Record<string, string[]>;
	oneMessage: boolean;
	// setErrors: Dispatch<SetStateAction<Record<string, string[]>>>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{
	children: ReactNode;
	errorMessage: Record<string, string[]>;
	oneMessage: boolean;
}> = ({ children, errorMessage, oneMessage }) => {
	const [errors, setErrors] =
		React.useState<Record<string, string[]>>(errorMessage);
	const [oneMessageState, setOneMessageState] = useState(oneMessage);
	// const setFieldError = f(field: string, error: string) => {
	// 	setErrors((prev) => ({ ...prev, [field]: error }));
	// };
	useEffect(() => {
		setErrors(errorMessage);
	}, [errorMessage]);

	useEffect(() => {
		setOneMessageState(oneMessage);
	}, [oneMessage]);
	return (
		<FormContext.Provider
			value={{
				errors,
				oneMessage: oneMessageState,
				// setErrors,
			}}
		>
			{children}
		</FormContext.Provider>
	);
};

export const useFormContext = () => {
	const context = useContext(FormContext);
	if (!context) {
		throw new Error("useFormContext must be used within FormProvider");
	}
	return context;
};
