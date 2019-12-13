const env=process.env.NODE_ENV  //判断模式
/**
 * @development 本地开发模式
 * @production  服务器生产模式
 */
const developmentNode='http://localhost:3000/' //本地NODE
const productionNode='http://47.106.248.148:3000/' //服务器NODE

export const serveUrl= env==='development'?developmentNode:productionNode //node默认路径，
