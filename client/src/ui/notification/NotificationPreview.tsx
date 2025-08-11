import { ReactNode } from 'react';
import classes from './NotificationPreview.module.scss';

const NotificationPreview = ({ children }: { children: ReactNode }) => {
	return <div className={classes['preview']}>{children}</div>;
};

export default NotificationPreview;
