// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import AutoImport from "file:///D:/Vue3+TypeScript/Vue3/Vue3+TypeScript/vue3-vite-ts-cms/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/Vue3+TypeScript/Vue3/Vue3+TypeScript/vue3-vite-ts-cms/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/Vue3+TypeScript/Vue3/Vue3+TypeScript/vue3-vite-ts-cms/node_modules/unplugin-vue-components/dist/resolvers.js";
import { defineConfig } from "file:///D:/Vue3+TypeScript/Vue3/Vue3+TypeScript/vue3-vite-ts-cms/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Vue3+TypeScript/Vue3/Vue3+TypeScript/vue3-vite-ts-cms/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { createStyleImportPlugin, ElementPlusResolve } from "file:///D:/Vue3+TypeScript/Vue3/Vue3+TypeScript/vue3-vite-ts-cms/node_modules/vite-plugin-style-import/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/Vue3+TypeScript/Vue3/Vue3+TypeScript/vue3-vite-ts-cms/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          resolveStyle: (name) => {
            return `element-plus/theme-chalk/${name}.css`;
          }
        }
      ]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxWdWUzK1R5cGVTY3JpcHRcXFxcVnVlM1xcXFxWdWUzK1R5cGVTY3JpcHRcXFxcdnVlMy12aXRlLXRzLWNtc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcVnVlMytUeXBlU2NyaXB0XFxcXFZ1ZTNcXFxcVnVlMytUeXBlU2NyaXB0XFxcXHZ1ZTMtdml0ZS10cy1jbXNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1Z1ZTMrVHlwZVNjcmlwdC9WdWUzL1Z1ZTMrVHlwZVNjcmlwdC92dWUzLXZpdGUtdHMtY21zL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSc7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgeyBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbiwgRWxlbWVudFBsdXNSZXNvbHZlIH0gZnJvbSAndml0ZS1wbHVnaW4tc3R5bGUtaW1wb3J0JztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV1cbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV1cbiAgICB9KSxcbiAgICBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbih7XG4gICAgICByZXNvbHZlczogW0VsZW1lbnRQbHVzUmVzb2x2ZSgpXSxcbiAgICAgIGxpYnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxpYnJhcnlOYW1lOiAnZWxlbWVudC1wbHVzJyxcbiAgICAgICAgICBlc01vZHVsZTogdHJ1ZSxcbiAgICAgICAgICByZXNvbHZlU3R5bGU6IChuYW1lKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYGVsZW1lbnQtcGx1cy90aGVtZS1jaGFsay8ke25hbWV9LmNzc2A7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSlcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgIH1cbiAgfVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9XLFNBQVMsZUFBZSxXQUFXO0FBQ3ZZLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBQ3BDLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixTQUFTLHlCQUF5QiwwQkFBMEI7QUFOcUssSUFBTSwyQ0FBMkM7QUFTbFIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDbkMsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDbkMsQ0FBQztBQUFBLElBQ0Qsd0JBQXdCO0FBQUEsTUFDdEIsVUFBVSxDQUFDLG1CQUFtQixDQUFDO0FBQUEsTUFDL0IsTUFBTTtBQUFBLFFBQ0o7QUFBQSxVQUNFLGFBQWE7QUFBQSxVQUNiLFVBQVU7QUFBQSxVQUNWLGNBQWMsQ0FBQyxTQUFTO0FBQ3RCLG1CQUFPLDRCQUE0QixJQUFJO0FBQUEsVUFDekM7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
