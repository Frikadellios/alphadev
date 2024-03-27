/// <reference path="../.astro/types.d.ts" />
/// <reference types="bun-types" />
/// <reference types="astro/client" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

declare module '*.astro' {
    const Component: any;
    export default Component;
  }