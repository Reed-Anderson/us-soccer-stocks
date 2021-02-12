import * as HtmlWebPackPlugin from "html-webpack-plugin"
import * as DotEnv from 'dotenv'
import * as Path from 'path'
import { DefinePlugin } from 'webpack'

const htmlPlugin = new HtmlWebPackPlugin( {
  template: "./src/launch/index.html"
} )

/* Environment Vars plugin */
const configObj = { path: Path.resolve( process.cwd(), 'dev.env' ) }
const env = DotEnv.config( configObj ).parsed
const envKeys = Object.keys( env ).reduce( ( prev: any, next ) => {
    prev[`process.env.${next}`] = JSON.stringify( env[next] )
    return prev
}, {} )
const envPlugin = new DefinePlugin( envKeys )

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
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
    ]
  },
  plugins: [ htmlPlugin, envPlugin ]
}

export default config