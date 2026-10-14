import {match} from 'path-to-regexp'

export default function routeExists(pathname){
    const registeredRoutes = [
        "/api/events"
    ]
    return registeredRoutes.some((route)=>
    match(route)(pathname) !== false)
}