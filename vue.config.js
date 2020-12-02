const pxRem = require("postcss-pxtorem")
module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                //selectorBlackList正则过滤，符合的class不进行rem转化
                //单个的css语句需过滤的情况下，可以使用PX或Px单位
                plugins: [ pxRem({
                    autoprefixer:{},
                    rootValue: 64,
                    propList: ['*', '!border*'],// 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部 默认全部处理
                    selectorBlackList:[".ig-",".dp-"]
                })]
            }
        }
    }
}