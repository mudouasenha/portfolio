import * as React from "react";

import { cn } from "@/lib/utils";

type SectionShellProps = React.ComponentProps<"section">;

const SectionShell = ({ className, ...props }: SectionShellProps) => {
    return <section className={cn("border-b border-border pb-16 sm:pb-20", className)} {...props} />;
};

export default SectionShell;
