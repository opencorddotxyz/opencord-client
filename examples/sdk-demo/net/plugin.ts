import client from "./client"
import * as components from "./pluginComponents"
export * from "./pluginComponents"

/**
 * @description "Load Balancer Health Check"
 */
export function index() {
	return client.get<null>("/")
}

/**
 * @description "Auth plugin's code"
 * @param params
 */
export function authCode(params: components.AuthCodeRequestParams) {
	return client.get<components.AuthCodeResponse>("/v1/users/auth", params)
}

/**
 * @description "Validate user's server-level permissions"
 * @param params
 */
export function validateServerPermissions(params: components.ValidateServerPermissionsRequestParams) {
	return client.get<components.ValidateServerPermissionsResponse>("/v1/servers/:serverId/permissions/validate", params)
}

/**
 * @description "Validate user's channel-level permissions"
 * @param params
 */
export function validateChannelPermissions(params: components.ValidateChannelPermissionsRequestParams) {
	return client.get<components.ValidateChannelPermissionsResponse>("/v1/channels/:channelId/permissions/validate", params)
}

/**
 * @description "Send notification"
 * @param req
 */
export function notify(req: components.NotifyRequest) {
	return client.post<null>("/v1/notify", req)
}
