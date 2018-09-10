import qs from 'qs';
import Path from 'path-parser';
import objectAssignDeep from 'object-assign-deep';

const request = ( url ) => ( route = '', params = {}, method = 'get', headers = {}, responseType = 'json' ) => {
    const defaultHeaders = {
        'Content-Type': 'application/json'
    };

    method = method.toLowerCase();
    headers = objectAssignDeep({}, defaultHeaders, headers);

    let request = { route, params, method, headers, responseType };
    request.getRoute = () => {
        if(!request.parsedPath) {
            let pathParser = new Path(route);
            let formattedRoute = pathParser.build(params);
            let routeParams = pathParser.test(formattedRoute);
            for(var key in routeParams) {
                if(!routeParams.hasOwnProperty(key)) {
                    continue;
                }

                delete params[key];
            }

            pathParser.formatted = () => formattedRoute;
            pathParser.data = () => params;
            pathParser.jsonData = () => JSON.stringify(params);
            pathParser.params = () => routeParams;
            // pathParser.withParams = () => `${formattedRoute}?${qs.stringify(params)}`;
            request.parsedPath = pathParser;
        }

        return request.parsedPath;
    };

    request.getUrl = () => {
        if(!request.url) {
            let formattedRoute = request.getRoute().formatted();
            if(url.charAt( url.length - 1 ) == '/') {
                url = url.slice(0, -1);
            }

            if(formattedRoute.charAt(0) !== '/') {
                formattedRoute = `/${formattedRoute}`;
            }

            request.url = (method !== 'get' && method !== 'delete')
                ? `${url}${formattedRoute}`
                : `${url}${formattedRoute}?${qs.stringify(params)}`;
        }

        return request.url;
    };

    return request;
};

export default request;
