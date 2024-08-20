import { TextClassList } from "../../types/textClassList";
import classes from "./AccountDetails.module.scss";

export default function AccountDetails() {
  return (
    <form className={classes.account}>
      <div className={classes.account__fields}>
        <div className={classes.form_input}>
          <span className={TextClassList.SEMIBOLD_16}>First name *</span>
          <input
            className={classes["account__fields-input"]}
            placeholder="First name"
            type="text"
          />
        </div>
        <div className={classes.form_input}>
          <span className={TextClassList.SEMIBOLD_16}>Last name *</span>
          <input
            className={classes["account__fields-input"]}
            placeholder="Last name"
            type="text"
          />
        </div>
        <div className={classes.form_input}>
          <span className={TextClassList.SEMIBOLD_16}>Display name *</span>
          <input
            className={classes["account__fields-input"]}
            placeholder="Display name"
            type="text"
          />
          <span className={TextClassList.REGULAR_12}>
            This will be how your name will be displayed in the account section
            and in reviews
          </span>
        </div>
        <div className={classes.form_input}>
          <span className={TextClassList.SEMIBOLD_16}>Email address *</span>
          <input
            className={classes["account__fields-input"]}
            placeholder="Email address"
            type="text"
          />
        </div>
      </div>
      <div className={classes.account__password}>
        <div
          className={`${TextClassList.SEMIBOLD_18} ${classes["account__password-title"]}`}
        >
          Password change
        </div>
        <div className={classes.account__fields}>
          <div className={classes.form_input}>
            <span className={TextClassList.SEMIBOLD_16}>Old password</span>
            <input
              className={classes["account__fields-input"]}
              placeholder="Old password"
              type="text"
            />
          </div>
          <div className={classes.form_input}>
            <span className={TextClassList.SEMIBOLD_16}>New password</span>
            <input
              className={classes["account__fields-input"]}
              placeholder="New password"
              type="text"
            />
          </div>
          <div className={classes.form_input}>
            <span className={TextClassList.SEMIBOLD_16}>
              Repeat new password
            </span>
            <input
              className={classes["account__fields-input"]}
              placeholder="Repeat new password"
              type="text"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
