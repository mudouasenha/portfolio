import * as React from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = React.ComponentProps<"h2">;

const SectionHeader = ({ className, ...props }: SectionHeaderProps) => {
    return <h2 className={cn("text-3xl sm:text-4xl font-semibold tracking-tight", className)} {...props} />;
};

export default SectionHeader;
