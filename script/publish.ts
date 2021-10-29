import "zx/globals";
import "colors";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { exec } from "./utils";

const argv = yargs(hideBin(process.argv)).argv as any;

const type = argv._[0] as "patch" | "minor" | "major";

console.log("编译打包".green);
exec("rm -rf lib && tsc -p tsconfig.build.json && babel lib --out-dir lib");

console.log("设置新的版本号".green);
exec(`npm version ${type}`);

console.log("发布到 npm".green);
exec("npm publish");

console.log("推送代码到 github".green);
exec("git push origin master --follow-tags");
