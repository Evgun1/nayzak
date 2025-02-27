'use server';
import { FC, ReactNode } from 'react';

type TabsTabProps = { children: ReactNode; label: string };

const TabsTab = async ({ children }: TabsTabProps) => {
	return <div>{children}</div>;
};

export default TabsTab;
