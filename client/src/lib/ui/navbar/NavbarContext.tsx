import { createContext, FC, ReactNode, useContext } from "react";

type NavbarContextProps = {
    navbarId: string;
};

const NavbarContext = createContext<NavbarContextProps | undefined>(undefined);

export const NavbarProvider: FC<{ children: ReactNode; navbarId: string }> = ({
    children,
    navbarId,
}) => {
    return (
        <NavbarContext.Provider value={{ navbarId }}>
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
