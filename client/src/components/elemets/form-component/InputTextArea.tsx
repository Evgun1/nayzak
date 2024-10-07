import { FC } from "react";
import classes from "./InputtextArea.module.scss";
import { InputType } from "./InputType";
import { TextClassList } from "@/types/textClassList";

interface InputTextAreaProps extends InputType {
  style: "line" | "contained";
  label: string;
}

const InputTextArea: FC<InputTextAreaProps> = ({
  style = "contained",
  inputSettings: { id, name, placeholder, required, value },
  label,
  error,
}) => {
  return (
    <div className={classes["textArea--container"]}>
      <span className={TextClassList.SEMIBOLD_16}>{label}</span>

      <textarea
        required={required}
        value={value}
        placeholder={placeholder}
        className={
          style === "contained"
            ? classes["textArea--container-contained"]
            : classes["textArea--container-line"]
        }
        name={name}
        id={id}
      ></textarea>
      {error ? (
        <span className={TextClassList.REGULAR_12}>{error}</span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default InputTextArea;
