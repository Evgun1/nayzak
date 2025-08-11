import classes from "./loading.module.scss";

const Spinner = (props: { className?: string }) => {
	return (
		<div
			className={`${classes["loading__spinner"]} ${
				props.className ? props.className : ""
			}`}
		></div>
	);
};

export default Spinner;
