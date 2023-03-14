import axios from 'axios';
import * as components from './pluginComponents';
import { NotifyRequest } from './pluginComponents';
export * from './pluginComponents';

const instance = axios.create();

const setToken = (token: string) => {
  instance.defaults.headers.common['Authorization'] = token;
};

export const pluginVerifyLoginCode = async (
  params: components.AuthCodeRequestParams
) => {
  const data = await instance.get(`/api/verifyCode`, {
    params: {
      ...params,
    },
  });
  const { token = '' } = data?.data?.data ?? {};
  setToken(token);
  return data;
};

export const validateServerPermissions = async (
  params: components.ValidateServerPermissionsRequestParams
) => {
  return await instance.get('/api/validateServerPermissions', { params });
};

export const validateChannelPermissions = async (
  params: components.ValidateChannelPermissionsRequestParams
) => {
  return await instance.get('/api/validateChannelPermissions', { params });
};

export const pluginNotify = async (params: NotifyRequest) => {
  return await instance.post('/api/notify', params);
};
