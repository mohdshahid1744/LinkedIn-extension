import {merge} from 'webpack-merge'
import common from './webpack.config.js'
module.exports=merge(common,{
    node:'development',
    devtool:'cheap-module-source-map',
})