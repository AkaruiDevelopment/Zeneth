import { DiscordApi } from './libconstants.js';
const ApiProxy = {
    get(target, prop) {
        if (['get', 'patch', 'put', 'post', 'delete'].includes(prop)) {
            target.method = prop.toUpperCase();
            return (...value) => target;
        }
        return (...value) => {
            if (value.length) {
                if (prop === 'symbol')
                    return target;
                target.api += `/${prop}/${value.join('/')}`;
                if (!target.route)
                    target.route = `/${prop}/${value.join('/')}`;
                return new Proxy(target, ApiProxy);
            }
            if (prop === 'symbol')
                return target;
            target.api += `/${prop}`;
            if (!target.route)
                target.route = prop;
            return new Proxy(target, ApiProxy);
        };
    },
};
const Api = () => new Proxy(
// @ts-ignore
{ api: DiscordApi, method: 'GET', route: '' }, ApiProxy);
export default Api;
//# sourceMappingURL=api.js.map