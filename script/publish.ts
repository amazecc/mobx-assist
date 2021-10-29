import "zx/globals";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv)).argv as any;

const type = argv._[0] as "patch" | "minor" | "major";

const publish = async () => {
    // 编译打包
    await $`rm -rf lib && tsc -p tsconfig.build.json && babel lib --out-dir lib`;
    // 设置新的版本号
    await $`npm version ${type}`;
    // 发布到 npm
    await $`npm publish`;
    // 推送代码到 github
    await $`git push origin master --follow-tags`;
};

publish();
