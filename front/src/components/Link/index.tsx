export const Link = ({ children, ...props }: React.ComponentProps<'a'>) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (props.onClick) props.onClick(e);

        window.history.pushState(null, '', props.href);
        window.dispatchEvent(new Event('popstate'));
    };

    return (
        <a {...props} onClick={handleClick}>
            {children}
        </a>
    );
};
