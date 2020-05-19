import dydUtil from '../lib/axios.js'
import serveUrl from './url'
let util=new dydUtil(serveUrl).util

import user from './user'
let api= Object.assign(
    user,
)

export {
    util,
    api
}