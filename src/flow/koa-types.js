/* @flow */
export type KoaType = {
  use: (middleware: KoaMiddlewareType) => void;
  middleware: Array<KoaMiddlewareType>
}

export type KoaNextType = () => Promise

export type KoaLiteContextType = {
  method: string;
  path: string;
  host: string;
  hostname: string;
  url: string,
  protocol: string
}

export type KoaMiddlewareType = (context: KoaLiteContextType, next?: KoaNextType) => Promise

export type KoaHandlerType = (context: KoaLiteContextType, args: any) => Promise;
