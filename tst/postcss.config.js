import postcssPresetEnv from 'postcss-preset-env'
import cssnano from 'cssnano'

export default {
  plugins: [
      cssnano({ preset: "default" }),
      postcssPresetEnv({ stage:1 })
  ],
}