import EmojiPicker, {
    EmojiClickData,
    SuggestionMode,
} from "emoji-picker-react";

interface EmojiDrawerProps {
    isDrawerOpen: boolean;
    onEmojiSelect: (emoji: string) => void;
}

const EmojiDrawer: React.FC<EmojiDrawerProps> = ({
    isDrawerOpen,
    onEmojiSelect,
}) => {
    const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
        onEmojiSelect(emojiData.emoji);
    };

    return (
        <div className={`w-full ${isDrawerOpen ? "block" : "hidden"}`}>
            <EmojiPicker
                searchPlaceHolder="Search for emojis"
                previewConfig={{
                    showPreview: false,
                }}
                suggestedEmojisMode={SuggestionMode.RECENT}
                width="100%"
                onEmojiClick={onEmojiClick}
            />
        </div>
    );
};

export default EmojiDrawer;
