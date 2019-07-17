### 1 . webpack是什么

```
	打包工具(模块打包器)
	前端工程师，必不可少工具
	webpack4.x
```

### 2. webpack作用

```
1. 打包  (把多个文件打包成一个js文件， 较少服务器压力、带宽)
2. 转化  (比如less、sass、ts)   需要loader
3. 优化  (SPA越来越盛行，前端项目复杂度高， webpack可以对项目进行优化)
```

### 3. webpack的构成

```
1. 入口   entry    
2. 出口	output
3. loaders  转化器
4. plugins  插件
5. devServer 开发服务器
6. mode   开发、生产
```

### 4. 配置文件

```javascript
webpack.config.js    webpack配置文件     => webpack遵循common.js规范 

	预览:

		module.exports={
			//入口配置
			entry:{},
			//出口配置
			output:{},
			//module.rules
			//loaders
			module:{},
			//插件
			plugins:[],
			//开发服务器
			devServer:{},
             mode: {},
		};
```

```javascript
module.exports={
    //入口配置
    entry:{
        a:'./src/index.js'
    },
    //出口配置
    output:{
        path:__dirname+'/dist', //path必须是绝对路径
        filename:'bundle.js'
    }
};
```

```javascript
const path = require('path'); //node系统模块
module.exports={
    //入口配置
    entry:{
        a:'./src/index.js'
    },
    //出口配置
    output:{
        path:path.resolve(__dirname,'dist'), //path必须是绝对路径
        filename:'bundle.js'
    }
};
```

配置文件名字一定得叫 webpack.config.js  答: 不是

```
如果改名叫:  mmr.config.js

	运行时候:

	webpack --config mmr.config.js
```



### 5.多入口多出口

- 多入口(多文件)打包一起:

  ```javascript
  	const path = require('path');
  	module.exports = {
  		entry:['./src/index.js','./src/index2.js'],  //按照顺一起打包 bundle.js
  		output:{
  			path:path.resolve(__dirname, 'dist'),
  			filename:'bundle.js'
  		}
  	};
  ```

- 多入口多出口配置:

  ```javascript
  	const path = require('path');
  	module.exports = {
  		entry:{
  			index:'./src/index.js',
  			index2:'./src/index2.js'
  		},
  		output:{
  			path:path.resolve(__dirname, 'dist'),
  			filename:'[name].bundle.js'
  		}
  	};
  ```

### 6. html-webpack-plugin 

注意: 依赖webpack、webpack-cli   非webpack自带

作用：生成页面


    1. 安装
    	npm i html-webpack-plugin -D
    2. 引入  (webpack.config.js)
    	const HtmlWebpackPlugin = require('html-webpack-plugin');
    3. 使用   (webpack.config.js)
    	plugins:[
    		new HtmlWebpackPlugin()
    	]

配置：

```javascript
		模板:
			new HtmlWebpackPlugin({
				template:'模板地址'
			})
		页面标题:
			new HtmlWebpackPlugin({
				title:'xxxxx',
				template:'模板地址'
			})

			一定记得在模板中使用: <%= htmlWebpackPlugin.options.title%>
		生成连接消除缓存:
			new HtmlWebpackPlugin({
				hash:true,
				title:'xxxxx',
				template:'模板地址'
			})
		压缩输出:
			new HtmlWebpackPlugin({
				minify:{
					collapseWhitespace:true,  //压缩空白
					removeAttributeQuotes:true //删除属性双引号
				},
				hash:true,
				title:'I Love China',
				template:'./src/index.html'
			})
		生成多个页面:
			filename:'xxx'
		多页面分别引入自己的js:
			chunks:['index']

	https://www.npmjs.com/package/html-webpack-plugin#
```



### 7.clean-webpack-plugin:

 删除某些东西(清除)

```
	1. 下载 
		cnpm i clean-webpack-plugin -D
	2. 引入(webpack.config.js)
		const CleanWebpackPlugin = require('clean-webpack-plugin');
	3. 使用:  (webpack.config.js)
		new CleanWebpackPlugin(['dist'])
```



### 8.devServer:

```javascript

	1. 下载
		cnpm i webpack-dev-server -D
	2. 使用
		devServer:{
		        //设置服务器访问的基本目录
		        contentBase:path.resolve(__dirname, 'dist'),
		        //服务器ip地址， localhost
		        host:'localhost',
		        //设置端口
		        port:8090
		    }

	此时  pakcage.json:
		"scripts": {
			"build": "webpack --mode development",
			"dev":"webpack-dev-server --mode development"
		}

	想自动打开浏览器:
		open:true

	热更新:
		hot:true

		开启:
			new webpack.HotModuleReplacementPlugin()   // webpack自带不用下载

	https://webpack.js.org/configuration/dev-server/
```

### 9.loaders

```
在webpack里面是一个很重要功能
	加载器、转化器
	比如: less/scss 转成css
	        ES7 8
	        jsx
```

处理CSS文件

```javascript
	style-loader
	css-loader

		cnpm i style-loader css-loader -D

	配置:
		module:{
			rules:[
				{
					test:/\.css$/,
					use:['style-loader','css-loader']
				}
			]
		}

	关于loader写法:
		1. use:['xxx-loader','xxx-loader']
		2. loader:['xxx-loader','xxx-loader']
		3. use:[
	                    {loader:'style-loader'},
	                    {loader:'css-loader'}
	                ]
```

```javascript
图片: (png,jpg,gif)
	url-loader
	file-loader

	1. cnpm i file-loader url-loader -D
	2. 配置
		{
	                test:/\.(png|jpg|gif)$/,
	                use:[{
	                    loader:'url-loader',   // url-loader依赖于file-loader 所有也下file-loader
	                    options:{
	                          limit:50，     // <50,转为base64,大于则变为路径
			 				outputPath:'images'
	                    }
	                }]
	            }
```

分离:  css

```javascript
	 

	1. cnpm i extract-text-webpack-plugin -D		webpack3.x
	
		cnpm i extract-text-webpack-plugin@next -D	webpack4.x
	2. 在plugins里面应用
		new ExtractTextPlugin(提取出去的路径)

		use:ExtractTextPlugin.extract({
		    fallback:'style-loader',
		    use:'css-loader',
		    publicPath:'../' //解决css背景图，路径问题
		})
	3. 遇见一些小事
```

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = {
    entry: {
        entry: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'rainbow',
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('css/index.css')
    ],
    module: {
      rules: [
          {
              test: /\.css$/,
            //   use: ['style-loader','css-loader']
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader',
                publicPath: '../'
              })
          },
          {
              test: /\.(jpg|png|gif)/,
              use: [
                  {
                    loader: 'url-loader',
                    options:{
                        limit: 50,
                        outputPath: 'images'   // 图片打包位置
                    }
                  }
              ]
          }
      ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        host: 'localhost',
        port: '9527',
        open: true,
        hot: true,
    }
}
```

less:

```javascript
	1. cnpm i less less-loader -D
	2. {
		test:/\.less$/,
		use:['style-loader','css-loader','less-loader']
	}
```

分离less:

```javascript
	{
                test:/\.less$/,
                //use:['style-loader','css-loader','less-loader']
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','less-loader']
                })
            }
```

sass:

```javascript
	cnpm i node-sass sass-loader -D

	配置:
	{
                test:/\.(sass|scss)$/,
                use:['style-loader','css-loader','sass-loader']
            }
```

提取sass:

```javascript
	{
                test:/\.(sass|scss)$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','sass-loader']
                })
      }
```

自动处理前缀:

	postCss	预处理器
	
	专门处理css平台
```javascript
1. cnpm i postcss-loader
	autoprefixer -D

2. 准备 postcss.config.js   配置postCss
	module.exports ={
		plugins:[
			require('autoprefixer')
		]
	};
3. 配置loader
	use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'},
                    {loader:'postcss-loader'}
                ]
4. 提取出来
	use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','postcss-loader'],
                    publicPath:'../' //解决css背景图，路径问题
                })
```

### 10.消除冗余css代码:

```javascript
	Purifycss

	1. 下载

		cnpm i purifycss-webpack purify-css -D
	2. 引入插件  (webpack.config.js)
		const PurifyCssWebpack = rewquire('purifycss-webpack');
	3. 需要引入一个额外包 (webpack.config.js)
		glob
		cnpm i glob -D
		const glob = require('glob')
	4. 在plugins里面配置   (webpack.config.js)
		new PurifyCssWebpack({
		            paths:glob.sync(path.join(__dirname, 'src/*.html'))
		        })
```



### 10.调试

```javascript
	webpack4.x 开启调试:
		--mode development

	webpack3.x之前:
		sourceMap

		devtool:'source-map',
```



### 11.bable

```javascript
	- babel用来编译js
	- 让你很轻松的使用 ESnext,转化
	- jsx

babel-core	bable-loader    babel-preset-env

	1. 下载
		cnpm i babel-loader babel-core babel-preset-env -D
	2. 配置
		{
	                test:/\.(js|jsx)$/,
	                use:['babel-loader'],
	                exclude:/node_modules/
	            }
	
	3..babelrc
		{
    		"presets": [
        		"env","react"
    		]
	}
	ESnext所有语法
    
    jsx:
	cnpm i babel-preset-react -D
	cnpm i react react-dom -D
```



### 12. 在webpack中用模块化:

```
	和node一模一样

	导出:
		module.exports = xxx
	引入:
		require('./xxxxx');   // ./是为了区分npm下载的模块和自己定义的模块
```

### 13. 在webpack中使用json:

```
	json-loader

	到webpack.3x版本之后不用，json可以默认就识别

	const json = require('./xxx.json')
```

### 14.静态资源输出

```javascript
	不需要webpack进行编译的文件，原封不动地搬过去就行=》静态资源输出=》
	
	copy-webpack-plugin

	1. 下载
		cnpm i copy-webpack-plugin -D
	2. 引入
		const CopyWebpackPlugin = require('copy-webpack-plugin');
	3. 使用
		plugins:[
			new CopyWebpackPlugin([{
				from:path.resolve(__dirname, 'src/assets'),
				to:'./public'
			}])
		]
---------------------------------------------	
https://webpack.js.org/plugins/copy-webpack-plugin/
```



### 15.使用第三库

```javascript
	1. 直接npm下载，然后引入（完全可以使用，但是我个人不是很推荐）
		cnpm i jquery -S
		
		import $ from 'jquery'

		$(xxxx).on()
		$(xxx).css()
	2. ProvidePlugin	(个人推荐此方式)  webpack自带，无需下载
		const webpack = require('webpack');

		在plugins里面使用:
		
			new webpack.ProvidePlugin({
				$:'jquery',
				lodash:'lodash'
				....
			})

	通过ProvidePlugin和 import直接引入区别:
		1. import $...，引入之后，无论你在代码中是否使用jquery，打包后，都会打进去，这样其实产生大量的冗余js
		2. Provideplugin, 只有你在使用到此库，才会打包
```



### 16.提取第三方(自己感觉想提取)js库

```javascript
	之前webpack3.x版本之前:
		
		new webpack.optimize.CommonsChunkPlugin({
		    name:'jquery'
		})

	到了webpack4.x版本:
		optimization.splitChunks  不是entry,plugins平级

		optimization:{
			splitChunks:{
				cacheGroups:{
					vendor:{
					    chunks:'initial',
					    name:'jquery',
					    enforce:true
					}
				}
			}
		}
		----------------------------------------------
		optimization:{
			splitChunks:{
				cacheGroups:{
					aaa:{
					    chunks:'initial',
					    name:'jquery',
					    enforce:true
					},
					bbb:{
					    chunks:'initial',
					    name:'入口名称',
					    enforce:true
					}
				}
			}
		}
```





### 10.打包完以后肯定需要压缩上线:

```
	如何压缩:
	1. webpack4.x
		--mode production
	2. 之前版本
		uglifyjs-webpack-plugin

		a). cnpm i uglifyjs-webpack-plugin -D
		b). const uglify = require('xxx);
		c). new uglify()
```









