function config(source) {
  return {
    templates: [
      {
        name: "template/page", // 模板文件的路径
        matches: (_minimatch, source) => {
          // 非文件夹不生产
          if (!source.isDirectory) {
            return false;
          }

          const { rawModuleName, relativeFilePath } = source.basicData;
          // 如果是小写开头的文件夹，不生成
          if (/^[a-z]/.test(rawModuleName)) {
            return false;
          }

          // if (!relativeFilePath.includes("components")) {
          //   return false;
          // }

          return true;
        },
      },
    ],
    globalData: {
      projectName: "vue2-template",
    },
  };
}

module.exports = config;
