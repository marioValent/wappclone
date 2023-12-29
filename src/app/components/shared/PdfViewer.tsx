const PdfViewer = ({ url }: { url: string }) => {
    return (
        <div className="bg-meta-msg p-2">
            <iframe src={url} width={100} height={141} />
        </div>
    );
};

export default PdfViewer;
