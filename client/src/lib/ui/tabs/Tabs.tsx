'use client';
import React, { ReactElement, ReactNode, useState } from 'react';
import TabsTab from './TabsTab';

type TabProps = {
	label: string;
	children: ReactNode;
};
export default function Tabs({ children }: { children: ReactNode }) {
	const label: string[] = [];
	console.log([children], Array.isArray(children));

	const childrenArray = [children];

	return <div>{childrenArray}</div>;
}

Tabs.Tab = function Tab({ children }: { children: ReactNode; label: string }) {
	return <div>{children}</div>;
};
