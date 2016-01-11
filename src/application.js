import __polyfill from "babel-polyfill";
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
        this.listening = true;
        this.page("*", this.callback());
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

    callback() {
        const fn = compose(this.middleware);

        return () => {
            return fn();
        };
    }
};


export default Application;
