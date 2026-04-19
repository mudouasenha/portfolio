import type { Meta, StoryObj } from "@storybook/react-vite";

import SectionCard from "./SectionCard";
import SectionHeader from "./SectionHeader";
import SectionShell from "./SectionShell";

const meta: Meta<typeof SectionShell> = {
  title: "components/sections/SectionShell",
  component: SectionShell,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Structural section wrapper that applies vertical rhythm and dividers between top-level page segments.",
      },
    },
  },
  args: {
    className: "px-6 py-10 sm:px-10",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default shell framing a single section block.
 */
export const Default: Story = {
  args: {},
  render: args => (
    <SectionShell {...args}>
      <div className="mx-auto max-w-5xl space-y-6">
        <SectionHeader>Experience</SectionHeader>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          SectionShell keeps spacing and separators consistent across the portfolio landing page.
        </p>
      </div>
    </SectionShell>
  ),
};

/**
 * Typical section composition using the shell with nested cards.
 */
export const WithContent: Story = {
  args: {},
  render: args => (
    <SectionShell {...args}>
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Experience</p>
          <SectionHeader>Senior engineering snapshots</SectionHeader>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Use the shell to compose section introductions and supportive content blocks without manually redoing spacing rules.
          </p>
        </div>
        <SectionCard className="p-6 sm:p-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">Recent focus</h3>
            <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <li>• AI product delivery with strong frontend polish</li>
              <li>• Design system-driven component reuse</li>
              <li>• Fast execution with verification-first workflows</li>
            </ul>
          </div>
        </SectionCard>
      </div>
    </SectionShell>
  ),
};
