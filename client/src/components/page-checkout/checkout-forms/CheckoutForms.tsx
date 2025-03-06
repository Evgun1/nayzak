import classes from "./CheckoutForms.module.scss";
import {
    CheckoutFormAddress,
    CheckoutFormContactInformation,
} from "./CheckoutFormPreview";

const CheckoutForms = () => {
    return (
        <div className={classes.forms}>
            <CheckoutFormContactInformation />
            <CheckoutFormAddress />
        </div>
    );
};

export default CheckoutForms;
