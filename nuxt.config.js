// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/apollo", "@nuxtjs/tailwindcss", "@nuxt/image-edge"],
  // directus: {
  // 	url: process.env.NUXT_DIRECTUS_URL,
  // },
  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.NUXT_PUBLIC_GRAPHQL_DEV,
      },
    },
  },
  runtimeConfig: {
    /* Keys within public, will be also exposed to the client-side */
    public: {
      DIRECTUS_FILE_URL: process.env.NUXT_DIRECTUS_FILE_URL,
      GQL_HOST: process.env.NUXT_PUBLIC_GRAPHQL_DEV,
      NUXT_PUBLIC_GRAPHQL_DEV: process.env.NUXT_PUBLIC_GRAPHQL_DEV,
    },
  },
  image: {
    domains: [process.env.NUXT_DIRECTUS_URL],
    alias: {
      url: process.env.NUXT_DIRECTUS_FILE_URL,
    },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devServerHandlers: [],
});
