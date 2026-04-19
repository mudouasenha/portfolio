import type { Meta, StoryObj } from "@storybook/react-vite";

import Projects from "./Projects";

const meta: Meta<typeof Projects> = {
  title: "components/Projects",
  component: Projects,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Selected work section with a featured case study card, supporting project cards, translated copy, and portfolio imagery.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Full projects section exactly as it renders from translation-backed content.
 */
export const Default: Story = {
  args: {},
  render: () => (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <Projects />
    </div>
  ),
};

/**
 * Projects section framed by neighboring anchors to validate in-page navigation targets.
 */
export const InLandingPageFlow: Story = {
  args: {},
  render: () => (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <section id="experience" className="border-b border-border py-10 text-sm text-muted-foreground">
        Experience section placeholder
      </section>
      <div id="projects">
        <Projects />
      </div>
      <section id="contact" className="py-10 text-sm text-muted-foreground">
        Contact section placeholder
      </section>
    </div>
  ),
};
