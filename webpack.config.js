import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer';

const common = {
    entry: {
        popup:path.resolve('./src/popup/popup.tsx'),
        options:path.resolve('./src/options/options.tsx'),
        background:path.resolve('./src/background/background.ts'),
        contentScript:path.resolve('./src/contentScript/index.tsx'),
        // newTab:path.resolve('./src/newTab/index.tsx')
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.tsx$/,
                exclude: /node_modules/,
            },
            {
                use:['style-loader','css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            ident: 'postcss',
                            plugins: [tailwindcss, autoprefixer],
                        },
                    },
                },],
                test:/\.css$/i,
            },
            {
                type: 'assets/resource',
                test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg)$/,
            },
        ],
    },
    plugins:[
        new CopyPlugin({
            patterns:[
                {
                    from:path.resolve('src/static'),
                    to:path.resolve('dist')
                }
            ],
        }),
       ...getHtmlPlugins([
        'popup',
        'options',
        // 'newTab'
       ])
       
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve('dist'), 
    },
    optimization: {
        splitChunks: {
            chunks(chunk){
                return chunk.name!=='contentScript'
            }
        }
    }
};


export default common; 

function getHtmlPlugins(chunks) {
    return chunks.map(chunk => new HtmlWebpackPlugin({
        title: 'React Extension',
        filename: `${chunk}.html`,
        chunks: [chunk]
    }))
}
