import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/button";

import SectionCard from "./SectionCard";

const meta: Meta<typeof SectionCard> = {
  title: "components/sections/SectionCard",
  component: SectionCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Surface container used to group featured content, summaries, and supporting actions inside portfolio sections.",
      },
    },
  },
  args: {
    className: "max-w-2xl p-6 sm:p-8",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base card surface with heading, copy, and supporting metadata.
 */
export const Default: Story = {
  args: {},
  render: args => (
    <SectionCard {...args}>
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Featured</p>
        <div className="space-y-2">
          <h3 className="text-3xl font-semibold text-foreground">AI product engineering</h3>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Reusable card styling for featured projects, role summaries, and other high-signal portfolio content.
          </p>
        </div>
      </div>
    </SectionCard>
  ),
};

/**
 * Card content with paired actions to preview richer portfolio use cases.
 */
export const WithActions: Story = {
  args: {},
  render: args => (
    <SectionCard {...args}>
      <div className="space-y-6">
        <div className="space-y-3">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            New case study
          </span>
          <div className="space-y-2">
            <h3 className="text-3xl font-semibold text-foreground">Execution-focused delivery</h3>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Combine strong typography, muted copy, and clear actions to spotlight work without leaving the portfolio visual system.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button>Read overview</Button>
          <Button variant="outline">Open repository</Button>
        </div>
      </div>
    </SectionCard>
  ),
};
