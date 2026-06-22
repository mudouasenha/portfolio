import type { Meta, StoryObj } from "@storybook/react-vite";

import Hero from "./Hero";

const meta: Meta<typeof Hero> = {
  title: "components/Hero",
  component: Hero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Top-of-page hero section that combines recruiter-facing copy, proof points, motion, and primary contact calls to action.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default hero section using the current locale toolbar selection.
 */
export const Default: Story = {
  args: {},
  render: () => (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <Hero />
    </div>
  ),
};

/**
 * Hero section framed with adjacent anchors to mirror the live landing page flow.
 */
export const InPageFlow: Story = {
  args: {},
  render: () => (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <div id="top" className="h-4" />
      <Hero />
      <section id="projects" className="py-12 text-sm text-muted-foreground">
        Downstream sections continue below the hero in the live app.
      </section>
      <section id="contact" className="pb-12 text-sm text-muted-foreground">
        Contact anchors remain available for CTA navigation inside Storybook.
      </section>
    </div>
  ),
};
