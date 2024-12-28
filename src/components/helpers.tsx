import {
    Children,
    cloneElement,
    isValidElement,
    PropsWithChildren,
} from "react";

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return <main className="flex flex-1 flex-col">{children}</main>;
};

const Section: React.FC<PropsWithChildren> = ({ children }) => {
    return <section className="border-grid border-b">{children}</section>;
};

const Container: React.FC<PropsWithChildren> = ({ children }) => {
    const StyledChildren = () =>
        Children.map(children, (child) =>
            isValidElement<{ className: string }>(child) ? (
                cloneElement(child, {
                    className: `${child.props.className} container`.trim(),
                })
            ) : (
                <div className="container">{child}</div>
            )
        );

    return (
        <div className="container-wrapper">
            <StyledChildren />
        </div>
    );
};
export { PageLayout, Section, Container };
