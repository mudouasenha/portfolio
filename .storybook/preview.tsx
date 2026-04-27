import type { Preview } from "@storybook/react-vite";

import "../src/index.css";
import i18n from "../src/i18n";

const preview: Preview = {
  parameters: {
    layout: "centered",
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "portfolio-canvas",
      values: [
        { name: "portfolio-canvas", value: "oklch(0.97 0.012 85)" },
        { name: "portfolio-ink", value: "oklch(0.145 0 0)" },
      ],
    },
  },
  globalTypes: {
    locale: {
      name: "Locale",
      description: "Story locale",
      defaultValue: "en",
      toolbar: {
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "pt", title: "Português" },
        ],
      },
    },
    theme: {
      name: "Theme",
      description: "Preview theme",
      defaultValue: "light",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      void i18n.changeLanguage(String(context.globals.locale ?? "en"));

      return (
        <div
          className={[
            "theme min-h-screen bg-background p-6 text-foreground",
            context.globals.theme === "dark" ? "dark" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="mx-auto w-full max-w-6xl">
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default preview;
