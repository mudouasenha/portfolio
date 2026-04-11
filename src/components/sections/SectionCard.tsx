import * as React from "react";

import { cn } from "@/lib/utils";

type SectionCardProps = React.ComponentProps<"article">;

const SectionCard = ({ className, ...props }: SectionCardProps) => {
    return (
        <article
            className={cn(
                "rounded-[1.4rem] border border-border/90 bg-card/95 text-card-foreground shadow-[0_18px_40px_-26px_rgba(33,39,56,0.45)] backdrop-blur-sm",
                className,
            )}
            {...props}
        />
    );
};

export default SectionCard;
