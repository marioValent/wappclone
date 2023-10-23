import Image from "next/image";
import Button from "./Button";
import arrowBack from "@/../public/arrowBack.svg";

interface DrawerProps {
    isDrawerOpen: boolean;
    titleText: string;
    closeModal: () => void;
    children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({
    isDrawerOpen,
    titleText,
    closeModal,
    children,
}) => {
    return (
        <div
            className={`absolute flex flex-col inset-0 h-full bg-white transform transition-transform ease-in-out duration-300 ${
                isDrawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <div className="bg-dark-green flex items-center pt-16 pb-3 px-7 gap-7">
                <Button isIcon onClick={closeModal}>
                    <Image
                        src={arrowBack}
                        style={{
                            filter: "brightness(0) invert(1)",
                            width: "1.75rem",
                            height: "1.75rem",
                        }}
                        alt="go-back icon"
                    />
                </Button>
                <h2 className="font-bold text-white text-lg">{titleText}</h2>
            </div>
            <div>{children}</div>
        </div>
    );
};

export default Drawer;
