import axios from 'axios'
import router from '@/router'
import * as jose from 'jose'
import LogoutRequest from '../models/LogoutRequest'
import RefreshRequest from '../models/RefreshRequest'

const AUTH_API = 'http://localhost:8081'

export function signup(signupRequest){
    return axios.post(AUTH_API + "/auth/signup", signupRequest)
    .then(response => router.push("/"))
}

export function login(loginRequest){
    return axios.post(AUTH_API + "/auth/login", loginRequest)
    .then(response => {
        saveTokens(response.data)
        if(getRole(getJwt()) == "customer"){
            router.push("/customer")
        }else if(getRole(getJwt()) == "admin"){
            router.push("/admin")
        }
    })
}

export function logout(){
    const logoutRequest = new LogoutRequest(getRefresh())
    return axios.post(AUTH_API + "/auth/logout", logoutRequest)
        .then(response => {
            clearTokens()
            router.push("/")
        })
}

export function refresh(){
    console.log("Refreshing JWT...")
    const refreshRequest = new RefreshRequest(getRefresh())
    return axios.post(AUTH_API + "/auth/refresh", refreshRequest)
    .then(response => {
        localStorage.setItem("jwt", response.data.jwt)
    })
}

export function getRole(jwt){
    return jose.decodeJwt(jwt).groups[0]
}

export function getJwt(){
    return localStorage.getItem("jwt")
}

export function getRefresh(){
    return localStorage.getItem("refreshToken")
}

function saveTokens(loginResponse){
    localStorage.setItem("jwt", loginResponse.jwt)
    localStorage.setItem("refreshToken", loginResponse.refreshToken)
}

function clearTokens(){
    localStorage.clear()
}