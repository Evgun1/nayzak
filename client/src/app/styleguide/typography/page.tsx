import DisplayIcon from "@/components/elements/icons/displayIcon";
import IconsIdList from "@/components/elements/icons/IconsIdList";

import classes from "./page.module.scss";
import { TextClassList } from "@/types/textClassList.enum";

const page = () => {
    return (
        <div className={classes.wrapper}>
            <div>
                <h1>Heading 1</h1>
                <h2>Heading 2</h2>
                <h3>Heading 3</h3>
                <h4>Heading 4</h4>
                <h5>Heading 5</h5>
                <h6>Heading 6</h6>
            </div>
            <div className={classes["wrapper__text"]}>
                <div>
                    <div className={`${TextClassList.REGULAR_26}`}>
                        Text 26px
                    </div>
                    <div className={`${TextClassList.REGULAR_22}`}>
                        Text 22px
                    </div>
                    <div className={`${TextClassList.REGULAR_20}`}>
                        Text 20px
                    </div>
                    <div className={`${TextClassList.REGULAR_18}`}>
                        Text 18px
                    </div>
                    <div className={`${TextClassList.REGULAR_16}`}>
                        Text 16px
                    </div>
                    <div className={`${TextClassList.REGULAR_14}`}>
                        Text 14px
                    </div>
                    <div className={`${TextClassList.REGULAR_12}`}>
                        Text 12px
                    </div>
                </div>
                <div>
                    <div className={`${TextClassList.BOLD_26}`}>Text 26px</div>
                    <div className={`${TextClassList.BOLD_22}`}>Text 22px</div>
                    <div className={`${TextClassList.BOLD_20}`}>Text 20px</div>
                    <div className={`${TextClassList.BOLD_18}`}>Text 18px</div>
                    <div className={`${TextClassList.BOLD_16}`}>Text 16px</div>
                    <div className={`${TextClassList.BOLD_14}`}>Text 14px</div>
                    <div className={`${TextClassList.BOLD_12}`}>Text 12px</div>
                </div>
                <div>
                    <div className={`${TextClassList.SEMIBOLD_26}`}>
                        Text 26px
                    </div>
                    <div className={`${TextClassList.SEMIBOLD_22}`}>
                        Text 22px
                    </div>
                    <div className={`${TextClassList.SEMIBOLD_20}`}>
                        Text 20px
                    </div>
                    <div className={`${TextClassList.SEMIBOLD_18}`}>
                        Text 18px
                    </div>
                    <div className={`${TextClassList.SEMIBOLD_16}`}>
                        Text 16px
                    </div>
                    <div className={`${TextClassList.SEMIBOLD_14}`}>
                        Text 14px
                    </div>
                    <div className={`${TextClassList.SEMIBOLD_12}`}>
                        Text 12px
                    </div>
                </div>
            </div>

            <DisplayIcon iconName={IconsIdList.ALERT} />
        </div>
    );
};

export default page;
