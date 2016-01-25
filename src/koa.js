/* @flow */
import type { KoaType, KoaMiddlewareType } from "./flow/koa-types";
import getPage from "isotropy-page";
import compose from "koa-compose";

class Application {
  proxy: boolean;
  middleware: Array<KoaMiddlewareType>;
  subdomainOffset: number;
  env: string;
  proxy: boolean;
  listening: boolean;
  page: (url?: string, cb?: Function) => void;
  composedMiddleware: KoaMiddlewareType;

  constructor() {
    this.proxy = false;
    this.middleware = [];
    this.subdomainOffset = 2;
    this.env = 'development';
    this.proxy = false;
    this.listening = false;
    this.page = getPage();
  }

  listen() : void {
    //Setup page.js handlers to intercept page .
    this.composedMiddleware = compose(this.middleware);
    this.listening = true;
    this.page("*", this.runMiddleware.bind(this));
    this.page();
  }

  toJSON() : Object {
    return {
      'subdomainOffset': this.subdomainOffset,
      'proxy': this.proxy,
      'env': this.env
    };
  }

  inspect() : Object {
    return this.toJSON();
  }

  use(fn: KoaMiddlewareType) : Application {
    this.middleware.push(fn);
    return this;
  }

  runMiddleware() : Promise {
    const context = {
      method: "GET",//We support only GET in koa-lite
      path: location.pathname,
      host: location.host,
      hostname: location.hostname,
      url: location.href,
      protocol: location.protocol,
      search: location.search
    };
    return this.composedMiddleware(context);
  }
};


export default Application;
