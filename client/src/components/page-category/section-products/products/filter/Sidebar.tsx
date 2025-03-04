'use client';

import classes from './Sidebar.module.scss';
import { MouseEventHandler, useContext, useEffect, useState } from 'react';
import FilterSection from './FilterSection';
import { TextClassList } from '@/types/textClassList.enum';
import { useSearchParams } from 'next/navigation';
import { FilterContext } from './FilterCtx';

export default function Sidebar() {
	const searchParams = useSearchParams();
	const urlSearchParams = new URLSearchParams(searchParams.toString());

	const { isActive, setIsActive } = useContext(FilterContext);
	const btnHiddenFilter: MouseEventHandler = (event) => setIsActive(!isActive);

	return (
		<div
			className={`${classes.wrapper} ${
				isActive ? '' : 'sidebar-filter-hidden'
			}`}
			id="sidebarFilter"
		>
			<div className={classes.wrapper__header}>
				<span className={TextClassList.SEMIBOLD_22}>Filter</span>
				<button
					className={classes['btn-close']}
					name="hiddenFilter"
					onClick={btnHiddenFilter}
				></button>
			</div>
			<div className={classes.wrapper__item}>
				<FilterSection searParams={urlSearchParams} />
			</div>
		</div>
	);
}
