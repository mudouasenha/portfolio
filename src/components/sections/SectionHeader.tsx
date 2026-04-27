import * as React from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = React.ComponentProps<"h2">;

const SectionHeader = ({ className, ...props }: SectionHeaderProps) => {
    return (
        <h2
            className={cn("text-4xl font-semibold leading-none text-foreground sm:text-5xl", className)}
            {...props}
        />
    );
};

export default SectionHeader;
