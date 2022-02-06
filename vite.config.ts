import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from 'path'
export const configureWebpack = {
    devtool: 'source-map'
};
export default () => {
    return defineConfig({
        plugins: [vue()],
        server: {
            host: "0.0.0.0",
            port: 19231
        },
        resolve: {
            alias: {
                "@": resolve(__dirname, 'src'), // 路径别名
            },
            extensions: ['.js', '.json', '.ts'] // 使用路径别名时想要省略的后缀名，可以自己 增减
        },
        base: './'

    })
}