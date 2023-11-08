"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import attachIcon from "@/../public/attachIcon.svg";
import closeIcon from "@/../public/closeIcon.svg";
import sendArrow from "@/../public/sendArrow.svg";
import { Document, Page, pdfjs } from "react-pdf";
import AttachMessageInput from "./AttachMessageInput";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface AttachDocumentProps {
    messageInputValue: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSendMessage: () => void;
    focusMessageInput: () => void;
    onEnterDown: (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => Promise<void>;
}

const AttachDocument: React.FC<AttachDocumentProps> = ({
    messageInputValue,
    handleInputChange,
    handleSendMessage,
    focusMessageInput,
    onEnterDown,
}) => {
    const [fileFormat, setFileFormat] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageDimensions, setImageDimensions] = useState<{
        width: number;
        height: number;
    } | null>({ width: 0, height: 0 });
    const attachMessageRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleImageLoad = () => {
        if (imageRef.current) {
            const { naturalHeight, naturalWidth } = imageRef.current;
            const newDimensions = {
                width: naturalWidth,
                height: naturalHeight,
            };
            if (
                newDimensions.width !== imageDimensions?.width ||
                newDimensions.height !== imageDimensions.height
            ) {
                setImageDimensions(newDimensions);
            }
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = event.target;
        const file = event.target.files?.[0];
        fileInput.value = "";
        if (file) {
            setIsOpen(true);
            setSelectedFile(file);

            const fileType = (file.name.split(".").pop() || "").toLowerCase();
            if (fileType === "pdf") {
                setFileFormat("pdf");
            } else {
                setFileFormat("image");
            }
        }
    };

    const handleAttachClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setSelectedFile(null);
        focusMessageInput();
    };

    const handleOnClickSendArrow = () => {
        handleSendMessage();
        handleClose();
    };

    useEffect(() => {
        if (selectedFile) {
            attachMessageRef.current?.focus();
        }
    }, [selectedFile]);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                handleClose();
                handleSendMessage();
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    return (
        <div className="shrink-0">
            <Image
                alt="attach-icon"
                className="w-7 cursor-pointer"
                src={attachIcon}
                title="Attach"
                onClick={handleAttachClick}
            />
            <input
                id="file-input"
                type="file"
                ref={fileInputRef}
                accept="application/pdf, image/*"
                hidden
                onChange={handleFileChange}
            />
            {selectedFile && (
                <div
                    className={
                        isOpen
                            ? `absolute flex flex-col gap-16 items-center bg-main-gray right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 h-full w-full z-40`
                            : `hidden`
                    }
                >
                    <div className="relative mt-14 text-center w-full bg-[#e9edef] p-4">
                        <Image
                            src={closeIcon}
                            alt="close icon"
                            className="absolute cursor-pointer"
                            onClick={handleClose}
                        />
                        <p>{selectedFile.name}</p>
                    </div>

                    <div className="flex h-1/2 w-full justify-center">
                        {fileFormat === "image" ? (
                            <Image
                                alt="selected-file"
                                src={URL.createObjectURL(selectedFile)}
                                className="min-w-[200px] max-w-2xl object-contain"
                                height={imageDimensions?.height}
                                width={imageDimensions?.width}
                                ref={imageRef}
                                onLoad={handleImageLoad}
                            />
                        ) : fileFormat === "pdf" ? (
                            <Document file={selectedFile}>
                                <Page pageNumber={1} />
                            </Document>
                        ) : null}
                    </div>

                    <div className="flex w-3/4 gap-8">
                        <AttachMessageInput
                            messageInputValue={messageInputValue}
                            selectedFile={selectedFile}
                            handleInputChange={handleInputChange}
                            onEnterDown={onEnterDown}
                        />
                        <div
                            className="flex justify-center cursor-pointer bg-main-green rounded-full w-[60px] h-[50px]"
                            onClick={handleOnClickSendArrow}
                        >
                            <Image
                                alt="send-arrow"
                                src={sendArrow}
                                style={{
                                    filter: "brightness(0) invert(1)",
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttachDocument;
