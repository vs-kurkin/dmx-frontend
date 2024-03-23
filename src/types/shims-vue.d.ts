declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<unknown, unknown, unknown>

  // noinspection JSUnusedGlobalSymbols
  export default component
}
