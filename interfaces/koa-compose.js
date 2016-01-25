declare module "koa-compose" {
  declare type KoaType = {
    use: (middleware: KoaMiddlewareType) => void;
    middleware: Array<KoaMiddlewareType>
  }

  declare type KoaNextType = () => Promise

  declare type KoaLiteContextType = {
    method: string;
    path: string;
    host: string;
    hostname: string;
    url: string,
    protocol: string
  }

  declare type KoaMiddlewareType = (context: KoaLiteContextType, next?: KoaNextType) => Promise

  declare function exports(middleware: Array<KoaMiddlewareType>) : KoaMiddlewareType
}
