import * as HtmlWebPackPlugin from "html-webpack-plugin"

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
  plugins: [ htmlPlugin ]
}

export default config