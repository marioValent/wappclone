import React, { forwardRef } from "react";

interface DropdownProps {
    children: React.ReactNode;
    dropdownBottom?: number;
    dropdownTop?: number;
    dropdownLeft: number;
    handleBtnClick: () => void;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(function Dropdown(
    {
        children,
        dropdownBottom,
        dropdownLeft,
        dropdownTop,
        handleBtnClick,
    }: DropdownProps,
    ref
) {
    return (
        <div
            id="dropdown"
            ref={ref}
            className="absolute bg-white flex rounded-md min-w-[170px] py-1.5 z-40"
            style={{
                bottom: dropdownBottom,
                left: dropdownLeft,
                top: dropdownTop,
            }}
        >
            <span
                className="w-full p-2 pl-5 cursor-pointer hover:bg-main-gray z-50"
                onClick={handleBtnClick}
            >
                {children}
            </span>
        </div>
    );
});

export default Dropdown;
