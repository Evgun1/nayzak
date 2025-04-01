import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DropDownContextProps {
    isOpen: boolean;
    toggleOpen: () => void;
}

const DropDownContext = createContext<DropDownContextProps | undefined>(undefined);

export const DropDownProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <DropDownContext.Provider value={{ isOpen, toggleOpen }}>
            {children}
        </DropDownContext.Provider>
    );
};

export const useDropDown = (): DropDownContextProps => {
    const context = useContext(DropDownContext);
    if (!context) {
        throw new Error('useDropDown must be used within a DropDownProvider');
    }
    return context;
};