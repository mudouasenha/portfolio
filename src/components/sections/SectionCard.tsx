import * as React from "react";

import { cn } from "@/lib/utils";

type SectionCardProps = React.ComponentProps<"article">;

const SectionCard = ({ className, ...props }: SectionCardProps) => {
    return (
        <article
            className={cn("rounded-xl border border-border bg-card text-card-foreground shadow-sm", className)}
            {...props}
        />
    );
};

export default SectionCard;
