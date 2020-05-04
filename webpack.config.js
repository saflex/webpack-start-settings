const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FontminPlugin = require('fontmin-webpack');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");




module.exports = {
	//mode: 'development',
	mode: 'production',

  entry: {
    'main': './src/js/index.js',
    'guid': './src/js/guid.js',
  },


  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "./js/[name].js"
  },

	devServer: {
		overlay: true,
		host: '192.168.0.23',
	},


	plugins: [

		new HtmlWebpackPlugin({
    chunks: ['main'],
    filename: 'index.html',
		template: './src/index.html', 
		}),
    new HtmlWebpackPlugin({
    chunks: ['main'],
    filename: 'index2.html',
    template: './src/index2.html', 
    }),
    new HtmlWebpackPlugin({
    chunks: ['guid'],
    filename: 'guid.html',
    template: './src/guid.html', 
    }),
		new MiniCssExtractPlugin({
    filename: "./css/[name].css",
    chunkFilename: "./css/[name].css"  
		//filename: './css/styles.css'
		}),
		new CleanWebpackPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
		}),	
		new OptimizeCssAssetsPlugin({
			  assetNameRegExp: /\.optimize\.css$/g,
		      cssProcessor: require('cssnano'),
		      cssProcessorPluginOptions: {
		        preset: ['default', { discardComments: { removeAll: true } }],
		      },
		      canPrint: true
		}),
		new FontminPlugin({
      		autodetect: true, 
    	}),	
    new MinifyPlugin({}, {
      comments: false
    }),

	],
	

	module: {
    rules: [


      {
  test: /\.html$/,
  loader: 'html-loader',
},




 {
         test: /\.(gif|png|jpg|jpeg|svg)$/i,
         include: /background-img/,
         use: [
            {
              loader: 'file-loader',

              options: {
                  name: '[name].[ext]',
                    useRelativePath: true,
                    outputPath: "img",
                    publicPath: "../img",

                          //name: '[name].[ext]',
                        //useRelativePath: true
                 },


            },
            {
              loader: 'image-webpack-loader',
                options: {        
            mozjpeg: {
                  progressive: true,
                  quality: 70
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 75
                }
              },

            },



         ]
      },


      {
         test: /\.(pdf)$/i,
         include: /pdf/,
         use: [
            {
              loader: 'file-loader',

              options: {
                  name: '[name].[ext]',
                    useRelativePath: true,
                    outputPath: "pdf",
                    publicPath: "pdf",

                          //name: '[name].[ext]',
                        //useRelativePath: true
                 },


            }

         ]
      },


      {
         test: /\.(png|ico)$/i,
         include: /favicons/,
         use: [
            {
              loader: 'file-loader',

              options: {
                  name: '[name].[ext]',
                    useRelativePath: true,
                    outputPath: "img/favicons",
                    publicPath: "img/favicons",

                          //name: '[name].[ext]',
                        //useRelativePath: true
                 },


            }

         ]
      },




     {
         test: /\.(gif|png|jpg|jpeg|svg|pdf)$/i,
         include: /regular-img/,
         use: [
            {
              loader: 'file-loader',

              options: {
                  name: '[name].[ext]',
                    useRelativePath: true,
                    outputPath: "img",
                    publicPath: "img",

                          //name: '[name].[ext]',
                        //useRelativePath: true
                 },


            },
            {
              loader: 'image-webpack-loader',
                options: {        
            mozjpeg: {
                  progressive: true,
                  quality: 70
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 75
                }
              },

            },



         ]
      },




    	{
         test: /\.s[ac]ss$/i,
         use: [
   			 MiniCssExtractPlugin.loader,
   			 {
                    loader: 'css-loader',
                   
                },

                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            autoprefixer({
                                overrideBrowserslist:['ie >= 9', 'last 3 version']
                            })
                        ],
                    
                    }
                },


                 {
            loader: "group-css-media-queries-loader",
            options: {}
          },

                {
                    loader: 'sass-loader',
                    
                },



         ]
    	},




  {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [{
            loader: "file-loader",
            options: {
                name: "[name].[ext]",
                outputPath: 'fonts/',
                publicPath: '../fonts/'
            }
        }]
    },




    {
        test: /\.(js|jsx)$/,
        use: [{
            loader: "babel-loader",
            //exclude: /node_modules/,
        }]
    },




    ],
  	},
}


