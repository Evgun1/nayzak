import { FC, RefObject, useEffect, useRef } from "react";
import classes from "./InputTextArea.module.scss";
import { InputType } from "./InputType";
import { TextClassList } from "@/types/textClassList.enum";

interface InputTextAreaProps extends InputType {
	style: "line" | "contained";
	label?: string;
}

const InputTextArea: FC<InputTextAreaProps> = ({
	style = "contained",
	inputSettings: { id, name, placeholder, required, defaultValue },
	label,
	error,
}) => {
	const inputContainerRef = useRef(null) as RefObject<HTMLTextAreaElement>;
	const inputRef = useRef() as RefObject<HTMLInputElement>;

	useEffect(() => {
		if (error !== undefined) {
			inputContainerRef.current?.classList.add(
				classes["textarea__input--error"],
			);
			return;
		}
		inputContainerRef.current?.classList.remove(
			classes["textarea__input--error"],
		);
	}, [error]);

	return (
		<div className={classes["textarea"]}>
			{label && (
				<span className={TextClassList.SEMIBOLD_16}>{label}</span>
			)}

			<textarea
				ref={inputContainerRef}
				required={required}
				value={defaultValue}
				placeholder={placeholder}
				className={`${
					style === "contained"
						? classes["textarea__input--contained"]
						: classes["textarea__input--line"]
				} ${classes["textarea__input"]}`}
				name={name}
				id={id}
			></textarea>
			{error && error.length > 0 && (
				<div className={classes["textarea__error-wrapper"]}>
					{error.map((val, i) => (
						<span
							key={i}
							className={`${TextClassList.REGULAR_12} ${classes["textarea__error"]}`}
						>
							{val}
						</span>
					))}
				</div>
			)}
		</div>
	);
};

export default InputTextArea;
