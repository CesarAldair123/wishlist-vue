import { getRefresh, getRole, getJwt } from "../services/AuthService"

export const customerGuard = (to, from) => {
    if(!getRefresh() || getRole(getJwt()) != "customer"){
      return "/"
    }
}
  
export const adminGuard = (to, from) => {
    if(!getRefresh() || getRole(getJwt()) != "admin"){
        return "/"
    }
}