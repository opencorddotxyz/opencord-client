export {};

declare global {
  interface Window {
    example: string;
    listen: (params: string) => void;
    OcPluginInterface: any;
    webkit: any;
  }
}
