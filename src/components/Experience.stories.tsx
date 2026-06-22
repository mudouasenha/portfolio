import type { Meta, StoryObj } from "@storybook/react-vite";

import Experience from "./Experience";

const meta: Meta<typeof Experience> = {
  title: "components/Experience",
  component: Experience,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Career timeline section with a featured current role card, expandable history, and tagged technology signals.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default experience section using translation-backed role history.
 */
export const Default: Story = {
  args: {},
  render: () => (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <Experience />
    </div>
  ),
};

/**
 * Experience section with surrounding anchors to mirror the landing page flow.
 */
export const InLandingPageFlow: Story = {
  args: {},
  render: () => (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <section id="about" className="border-b border-border py-10 text-sm text-muted-foreground">
        About section placeholder
      </section>
      <div id="experience">
        <Experience />
      </div>
      <section id="projects" className="py-10 text-sm text-muted-foreground">
        Projects section placeholder
      </section>
    </div>
  ),
};
