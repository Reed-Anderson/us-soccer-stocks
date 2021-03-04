import * as HtmlWebPackPlugin from "html-webpack-plugin"
import * as Path from "path"

const htmlPlugin = new HtmlWebPackPlugin( {
  template: "./src/launch/index.html"
} )


const config = {
  mode: "development",
  entry: "./src/launch/index.tsx",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [ ".ts", ".tsx", ".js", ".json" ]
  },
  devServer: {
    historyApiFallback: true
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  output: {
    path: Path.resolve( __dirname, 'dist' ),
    filename: 'bundle.js',
    publicPath: '/'
},
  plugins: [ htmlPlugin ]
}

export default config