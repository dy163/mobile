/*
*module.exports = {
  plugins: {
    //post-css 是一个后处理器(配置文件)
    autoprefixer: {},
    'postcss-pxtorem': {
      //rem转化的基准值
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
如果vant 的样式是37.5就去转(因为vant是基于375像素设计的)
如果我们自己写,可能会基于其他的像素值转化了(75)
*/
const { sep } = require('path')
// path.sep 用于获取操作系统的路劲
module.exports = ({ file }) => {
  const rootValue = file.dirname.indexOf(`node_modules${sep}vant`) !== -1
    ? 37.5
    : 75
  return {
    plugins: {
      autoprefixer: {},
      'postcss-pxtorem': {
        rootValue,
        propList: ['*']
      }
    }
  }
}
