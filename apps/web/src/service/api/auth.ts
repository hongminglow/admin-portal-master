import { request } from "../request";

/**
 * Login
 *
 * @param userName User name
 * @param password Password
 */
export function fetchLogin(
  username: string,
  password: string,
  captchaId: string,
  verifyCode: string
) {
  return request<Api.Auth.LoginToken>({
    url: "/auth/login",
    method: "post",
    data: {
      username,
      password,
      captchaId,
      verifyCode,
    },
  });
}

/** Get user info */
export function fetchGetUserInfo() {
  return request<Api.Auth.UserInfo>({ url: "/account/profile" });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    url: "/auth/refresh",
    method: "post",
    data: {
      refreshToken,
    },
  });
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request({ url: "/auth/error", params: { code, msg } });
}

/** Get captcha image for login */
export function fetchLoginCaptcha(params?: {
  width?: number;
  height?: number;
}) {
  return request<Api.Auth.Captcha>({ url: "/auth/captcha/img", params });
}

/** Dashboard sample metrics */
export function fetchDashboardCards() {
  return request<Api.Dashboard.Cards>({ url: "/dashboard/cards" });
}
