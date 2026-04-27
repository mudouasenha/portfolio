import type { Meta, StoryObj } from "@storybook/react-vite";

import Contact from "./Contact";

const meta: Meta<typeof Contact> = {
  title: "components/Contact",
  component: Contact,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Closing contact section with recruiter-oriented copy, response details, and primary external actions.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default contact section with CTA buttons and response metadata.
 */
export const Default: Story = {
  args: {},
  render: () => (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <Contact />
    </div>
  ),
};

/**
 * Contact section placed after a project placeholder to reflect end-of-page usage.
 */
export const AtPageEnd: Story = {
  args: {},
  render: () => (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
      <section id="projects" className="border-b border-border py-10 text-sm text-muted-foreground">
        Projects section placeholder
      </section>
      <div id="contact">
        <Contact />
      </div>
    </div>
  ),
};
