import { defineConfig, Plugin } from "vite";
import { createVuePlugin as vue } from "vite-plugin-vue2";
import path from "path";
import pkg from "./package.json";
import fs from "fs";
import _ from "lodash";
import WindiCSS from "vite-plugin-windicss";
import svgicon from "vite-plugin-svgicon";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ jsx: true }),
    WindiCSS(),
    svgicon({
      include: ["**/svg-icon/**/*.svg"],
    }),
    transformIndexHtml({
      template: path.join(__dirname, "public/index.html"),
      templateData: {
        BASE_URL: "/",
        htmlWebpackPlugin: {
          options: {
            title: pkg.name,
          },
        },
      },
      entry: "/src/main.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@icon": path.resolve(__dirname, "./src/assets/svg-icon"),
    },
    extensions: [".js", ".ts", ".tsx", ".vue", ".jsx"],
  },
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
});
function transformIndexHtml(opts: {
  template: string;
  templateData?: Record<string, unknown>;
  entry?: string;
}): Plugin {
  const rootIndexHtml = path.join(__dirname, "index.html");

  if (!fs.existsSync(rootIndexHtml)) {
    // Ensure the index.html exists in root directory.
    fs.symlinkSync(opts.template, rootIndexHtml);
  }

  return {
    name: "cxmh:transformIndexHtml",
    transformIndexHtml(html) {
      let indexHtml = html;

      try {
        const compiled = _.template(indexHtml, {
          interpolate: /<%=([\s\S]+?)%>/g,
        });
        const entry = opts.entry || "/src/main.ts";

        indexHtml = compiled(opts.templateData);

        indexHtml = indexHtml
          .split("\n")
          .map((line) =>
            line.includes("</body>")
              ? `    <script type="module" src="${entry}"></script>
  ${line}`
              : line
          )
          .join("\n");
      } catch (error) {
        indexHtml = `<h2>${error}</h2>`;
      }

      return indexHtml;
    },
  };
}
