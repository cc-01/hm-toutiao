module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // ...省略了其他
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      // 指定样式路径
      style: (name) => `${name}/style/less`
    }, 'vant']
  ]

}
