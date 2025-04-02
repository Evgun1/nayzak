import {
    createContext,
    FC,
    ReactNode,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";

type SelectContextProps = {
    addItemKey: (key: string | number) => void;
    itemKey: string | number | undefined;
    addDefaultLabel: (currLabel: string) => void;
    defaultLabel: string;
};

const SelectContext = createContext<SelectContextProps | undefined>(undefined);

export const SelectProvider: FC<{
    children: ReactNode;
    defaultSelectKey?: string;
    label: string;
}> = ({ children, defaultSelectKey, label }) => {
    const [itemKey, setItemKey] = useState<string | number | undefined>(
        undefined
    );

    const [defaultLabel, setDefaultLabel] = useState<string>(label);

    const defaultLabelRef = useRef<string>(label);

    function addItemKey(key: string | number) {
        setItemKey(key);
    }

    function addDefaultLabel(currLabel: string) {
        setDefaultLabel(currLabel);
    }

    useEffect(() => {
        setItemKey(defaultSelectKey);

        if (!defaultSelectKey) {
            setDefaultLabel(label);
        }
    }, [defaultSelectKey]);

    return (
        <SelectContext.Provider
            value={{
                addItemKey,
                itemKey,
                addDefaultLabel,
                defaultLabel: defaultLabel,
            }}
        >
            {children}
        </SelectContext.Provider>
    );
};

export const useSelect = () => {
    const context = useContext(SelectContext);

    if (!context) {
        throw new Error("useSelect must be used within a SelectorProvider");
    }

    return context;
};
