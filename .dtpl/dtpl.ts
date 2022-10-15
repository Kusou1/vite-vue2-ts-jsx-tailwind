
import * as _ from "dot-template-types";
import * as path from "path";

/*
  注意：

    1. 虽然 ts 文件有很强的语法提示，但默认情况下 dot-template 并不支持，
       你需要把它编译成 js 文件并放在同目录下；不过 dot-template 也是可
       以支持处理 ts 文件的，需要你在当前项目中安装  `ts-node` 和
       `typescript` 组件。

    2. 在此脚本中使用 console 语句是不会输出在控制面板的，因为此脚本是在
       vscode 插件中执行的，插件的输出不在当前环境中；不过你可以设置配置
       项中的 dot-template-vscode.debug 为 true，并在此程序中执行：

       source.app.debug('...')

    3. 当 matches 是字符串时，可以只匹配 basename，但如果 matches 带
       路径时，就要从项目根路径开始匹配，否则无法匹配成功。(主要是是因为
       minimatch 的选项 matchBase 设置为 true 了，你可以用
       dot-template-vscode.minimatchOptions 来修改默认的配置)
 */

export default function (source: _.Source): _.IDtplConfig {
  return {
    templates: [
      /**
       * =================  模板三 : 创建关联文件，并生成其内容   =================
       */
      {
        name: "template/page", // 模板文件的路径
        matches: (_minimatch: _.IMinimatchFunction, source: _.Source) => {
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
      // =======================      模板三 配置结束     =======================
    ],

    /**
     * 生成自定义的数据，在渲染模板时会使用，模板总共会从三处获取数据
     *
     *  1. 系统提供的文件本身的 basicData ，参考： https://github.com/qiu8310/dot-template#environment
     *  2. 用户配置的只有指定的模板才能用的 localData，可以在 templates 中的对象中配置
     *  3. 用户配置的所有模板都可以用的 globalData，如下所示
     *
     *
     * 注意，在创建三种不同的文件时，数据结构会有细微不一样
     *
     * - 文件夹复制
     *
     *    模板文件夹内的文件都没有 localData，但它可以通过 ref 获取到文件夹模板的 data 数据，
     *    而文件夹模板是可以包含 localData 的
     *
     * - 创建文本文件
     *
     *    文本文件默认的 data 会和 globalData 的数据 merge
     *
     *
     * - 创建关联文件
     *
     *    源文件和关联文件可能都会有它自己的模板，有它自己的 localData，
     *    所以它们的 data 会和各自的 localData 合并，有一点不一样的是，
     *    关联文件可以通过 ref 来引用源文件的所有 data 数据
     */
    globalData: {
      projectName: "vue2-template",
    },
  };
}
