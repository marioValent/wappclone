import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../shared/Spinner";
import { BASE_URL, MetaParserDefault } from "@/app/common";

interface SocialMetadataLinkProps {
    url: string;
}

const SocialMetadataLink: React.FC<SocialMetadataLinkProps> = ({ url }) => {
    const [metaData, setMetaData] = useState(MetaParserDefault);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}/api/message/meta?query=${url}`
                );
                setMetaData(response.data);
            } catch (error: any) {
                if (error.response?.status === 500) {
                    setMetaData(MetaParserDefault);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    if (isLoading) return <Spinner />;

    return (
        <div className="flex flex-col gap-2">
            <div
                className={`${
                    metaData.title || metaData.description || metaData.imageUrl
                        ? "flex flex-col items-center gap-2 bg-[#d1f4cc] py-1.5 px-2.5 w-full rounded-md"
                        : "hidden"
                }`}
            >
                <a
                    className="text-blue-link font-bold hover:underline"
                    href={url}
                    target="_blank"
                >
                    {metaData.title}
                </a>
                <span className="text-black cursor-text">
                    {metaData.description}
                </span>

                <img
                    alt="meta-image"
                    className="max-h-lg max-w-xs max-h-52 object-contain cursor-pointer"
                    src={metaData.imageUrl}
                    title="Navigate to Image's source"
                    onClick={() => window.open(metaData.imageUrl, "_blank")}
                />
            </div>

            <a
                className="text-blue-link hover:underline px-2.5"
                href={url}
                target="_blank"
            >
                {url}
            </a>
        </div>
    );
};

export default SocialMetadataLink;
