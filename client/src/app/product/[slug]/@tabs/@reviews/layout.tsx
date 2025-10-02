import { FC, ReactNode } from "react";

interface ReviewsLayoutProps {
	children: ReactNode;
}

const ReviewsLayout: FC<ReviewsLayoutProps> = (props) => {
	return props.children;
};

export default ReviewsLayout;
