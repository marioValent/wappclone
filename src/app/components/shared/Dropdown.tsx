import React, { forwardRef } from "react";

interface DropdownProps {
    dropdownBottom: number;
    dropdownLeft: number;
    handleDeleteBtn: () => void;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(function Dropdown(
    { dropdownBottom, dropdownLeft, handleDeleteBtn }: DropdownProps,
    ref
) {
    return (
        <div
            ref={ref}
            className="absolute bg-white flex rounded-md min-w-[170px] py-1.5 z-30"
            style={{ bottom: dropdownBottom, left: dropdownLeft }}
        >
            <span
                className="w-full p-2 pl-5 cursor-pointer hover:bg-main-gray"
                onClick={handleDeleteBtn}
            >
                Delete
            </span>
        </div>
    );
});

export default Dropdown;
