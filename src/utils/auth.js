const currentAuth = ["user"];
export { currentAuth };

// 获取现在的权限
export function getCurrentAuthority() {
  return currentAuth;
}

// 校验权限
export function checkCurrentAuthority(a) {
  const current = getCurrentAuthority();
  return current.some(i => a.includes(i));
}

// 登陆判断
export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== "guest";
}
