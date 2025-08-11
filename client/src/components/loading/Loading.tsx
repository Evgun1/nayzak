import classes from "./loading.module.scss";
import Spinner from "./Spinner";

const Loading = (props: { height: number; className?: string }) => {
	return (
		<div
			className={classes.loading}
			style={{ height: `${props.height}px` }}
		>
			<Spinner />
		</div>
	);
};

export default Loading;
