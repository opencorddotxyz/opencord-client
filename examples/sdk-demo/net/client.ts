import axios, { AxiosError, AxiosResponse } from 'axios';

type Param = {
  [k: string]: any;
};

type ComposedResponse<T> = AxiosResponse<T> & BusinessInfo;

type ClientFuncWithPathParam = <T = any, R = ComposedResponse<T>>(
  url: string,
  pathParam?: Param,
  param?: Param
) => Promise<R>;

type Client = {
  get: ClientFuncWithPathParam;
  head: ClientFuncWithPathParam;
  options: ClientFuncWithPathParam;
  delete: ClientFuncWithPathParam;
  post: ClientFuncWithPathParam;
  put: ClientFuncWithPathParam;
  patch: ClientFuncWithPathParam;
};

type BusinessInfo = {
  code: number;
  message: string;
  title: string;
  ok: string;
};

const instance = axios.create({
  baseURL: process.env.API_HOST,
  headers: {
    'oc-plugin-appid': process.env.APP_ID,
    'oc-plugin-secret': process.env.APP_SECRET,
  },
});
const supportMethods = [
  'get',
  'head',
  'options',
  'delete',
  'post',
  'put',
  'patch',
];

function replacePathParams(path: string, param: Param) {
  const restParam = { ...param };
  let parsedPath = path;

  Object.entries(param).forEach(([k, v]) => {
    if (parsedPath.includes(`:${k}`)) {
      Reflect.deleteProperty(restParam, k);
    }
    parsedPath = parsedPath.replace(`:${k}`, encodeURIComponent(v));
  });

  return {
    parsedPath,
    restParam,
  };
}

async function withTransformData<T = any>(
  url: string,
  pathParam?: Param,
  param?: Param,
  method = 'get'
): Promise<ComposedResponse<T>> {
  const { parsedPath, restParam } = replacePathParams(url, pathParam || {});
  let response = {} as ComposedResponse<T>;
  try {
    if (
      ['get', 'head', 'options'].findIndex((v) => {
        return v === method;
      }) !== -1
    ) {
      response = await instance[method](parsedPath, {
        params: { ...restParam, ...(param || {}) },
      });
    } else {
      response = await instance[method](parsedPath, {
        ...restParam,
        ...(param || {}),
      });
    }
  } catch (err) {
    const errResponse = (err as AxiosError).response as any;
    if (errResponse?.status === 401) {
      if (location.pathname !== '/') {
        location.replace('/');
      }
    } else if (errResponse?.data['code']) {
      // deal with logic that with a none 2XX http status but with code
      response.code = errResponse?.data['code'];
      response.message = errResponse?.data['message'];
    } else {
      // deal with logic with node success status, and without code,
      // maybe show alert info later
      throw err;
    }
  }
  return response;
}

const client = {} as Client;
supportMethods.forEach((method) => {
  client[method] = (url: string, pathParam: Param, bodyParam: Param) => {
    return withTransformData(url, pathParam, bodyParam, method);
  };
});

export default client;

export function setAxiosToken(token: string) {
  instance.defaults.headers.common['authorization'] = token;
}
