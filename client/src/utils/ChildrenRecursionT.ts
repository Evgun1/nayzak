import React, { ReactElement, ReactNode } from "react";

type ChildrenRecursionProps = {
    children: ReactNode;
    childType: React.JSXElementConstructor<any>;
};

function childrenRecursion(props: ChildrenRecursionProps): ReactNode {
    const { childType, children } = props;

    return React.Children.map(children, (child): ReactNode => {
        if (!React.isValidElement(child)) return child;

        if (typeof child.type === "function") {
            switch (child.type) {
                case childType:
                    return React.cloneElement(child, {});

                default:
                    const childTypeFunction = child.type as Function;
                    const clonedElement = childTypeFunction(
                        child.props
                    ) as ReactElement<{
                        children: ReactNode;
                    }>;
                    return React.cloneElement(clonedElement, {
                        children: clonedElement.props.children,
                    });
            }
        } else {
            const childWithChildren = child as ReactElement<{
                children: ReactNode;
            }>;

            return React.cloneElement(childWithChildren, {
                children: childWithChildren.props.children,
            });
        }
    });
}

export default childrenRecursion;
