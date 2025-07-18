interface TagProps {
    text: string;
    tagKey: number;
}

const Tag: React.FC<TagProps> = ({ text }) => {
    return (
        <span
            className="mr-2 mt-3 rounded-lg bg-neutral-800 px-2 py-1 text-sm font-medium text-purple-300 border border-neutral-700 
                       transition-all duration-300 hover:bg-neutral-700 cursor-default"
        >
            {text}
        </span>
    );
}

export default Tag;
