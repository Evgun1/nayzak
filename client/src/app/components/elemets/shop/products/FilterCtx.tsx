"use client"
import { FC, ReactNode, createContext, useEffect, useState } from "react";

type FilterContextValue = {
  isActive: boolean;
  setIsActive: (newValue: boolean) => void;
};

export const FilterContext = createContext<FilterContextValue>({
  isActive: true,
  setIsActive: (newValue) => {},
});

export const FilterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isActive, setIsActive] = useState<boolean>(true);
  useEffect(()=>console.log(isActive), [isActive]);
  
  return (
    <FilterContext.Provider value={{ isActive, setIsActive}}>
      {children}
    </FilterContext.Provider>
  );
};
