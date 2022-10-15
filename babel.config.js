module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
};
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset', // or '@vue/app'
  ],
  plugins: [
    ['@babel/plugin-transform-typescript', { isTSX: true }], // 开启 typescript
  ],
}
