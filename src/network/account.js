import { request } from "utils/main";
// 手机号登录
// phone: 手机号，password：密码，captcha：验证码
// /login/cellphone?phone=xxx&password=yyy 
// /login/cellphone?phone=xxx&captcha=1234
export function ph_login(phone, captcha) {
  return request({
    url: '/login/cellphone',
    params: {
      phone,
      captcha
    }
  })
}
// 发送验证码
export function sentCode(phone) {
  return request({
    url: '/captcha/sent',
    params: {
      phone
    }
  })
}

// 验证验证码
export function checkCode(phone, captcha) {
  return request({
    url: '/captcha/verify',
    params: {
      phone,
      captcha
    }
  })
}

// 1. 二维码 key 生成接口
export function qrKey() {
  return request({
    url: '/login/qr/key'
  })
}

// 2.二维码生成接口：key：时间戳
export function qr_create(key, qrimg = 'base64') {
  return request({
    url: '/login/qr/create',
    params: {
      key,
      qrimg
    }
  })
}

// 二维码检测扫码状态接口
export function qr_check(key, timerstamp) {
  return request({
    url: '/login/qr/check',
    params: {
      key, 
      timerstamp
    }
  })
}

// 注册（修改密码）
export function register(phone, captcha, password, nickname ) {
  return request({
    url: '/register/cellphone',
    params: {
      phone,
      captcha,
      password,
      nickname
    }
  })
}

// 检测手机号是否注册
export function phoneExistenceCheck(phone) {
  return request({
    url: '/cellphone/existence/check',
    params: {
      phone,
    }
  })
}
// 退出登录
export function LoginOut() {
  return request({
    url: '/logout'
  })
}
