import getPage from "isotropy-page";
import compose from "koa-compose";

class Application {

  constructor() {
    this.proxy = false;
    this.middleware = [];
    this.subdomainOffset = 2;
    this.env = 'production';
    this.listening = false;
    this.page = getPage();
  }

  listen() {
    //Setup page.js handlers to intercept page .
    this.composedMiddleware = compose(this.middleware);
    this.listening = true;
    this.page("*", this.runMiddleware.bind(this));
    this.page();
  }

  toJSON() {
    return only(this, [
      'subdomainOffset',
      'proxy',
      'env'
    ]);
  }

  inspect() {
    return this.toJSON();
  }

  use(fn) {
    this.middleware.push(fn);
    return this;
  }

  runMiddleware() {
    context.method = "GET"; //We support only get in koa-lite
    context.path = location.pathname;
    context.host = location.host;
    context.hostname = location.hostname;
    context.url = location.href;
    context.protocol = location.protocol;
    context.search = location.search;
    return this.composedMiddleware(context);
  }
};


export default Application;
