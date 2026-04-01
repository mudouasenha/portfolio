interface TagProps {
    text: string;
    tagKey: number;
}

const Tag: React.FC<TagProps> = ({ text }) => {
    return (
        <span
            className="mr-2 mt-3 cursor-default rounded-lg border border-border bg-accent px-2 py-1 text-sm font-medium text-accent-foreground transition-all duration-300 hover:bg-accent/80"
        >
            {text}
        </span>
    );
}

export default Tag;
