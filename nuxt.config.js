// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify from "vite-plugin-vuetify";
import { createResolver } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/apollo",
    "@nuxt/image-edge",
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        config.plugins.push(vuetify())
      );
    },
  ],
  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.NUXT_PUBLIC_GRAPHQL_PUB,
      },
    },
  },
  runtimeConfig: {
    /* Keys within public, will be also exposed to the client-side */
    public: {
      DIRECTUS_FILE_URL: process.env.NUXT_DIRECTUS_FILE_URL_PUB,
      GQL_HOST: process.env.NUXT_PUBLIC_GRAPHQL_PUB,
      NUXT_PUBLIC_GRAPHQL_DEV: process.env.NUXT_PUBLIC_GRAPHQL_PUB,
    },
  },
  image: {
    domains: [process.env.NUXT_DIRECTUS_URL_PUB],
    alias: {
      url: process.env.NUXT_DIRECTUS_FILE_URL_PUB,
    },
  },
  //css: ["~/assets/css/main.css"],
  css: ["vuetify/styles", "~/assets/css/main.css"],
  vite: {
    // @ts-ignore
    // curently this will lead to a type error, but hopefully will be fixed soon #justBetaThings
    ssr: {
      noExternal: ["vuetify"], // add the vuetify vite plugin
    },
  },
  routeRules: {
    "/": { redirect: "/works/1" },
  },
});
