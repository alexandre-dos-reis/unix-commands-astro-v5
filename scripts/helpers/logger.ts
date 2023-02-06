import chalk from "chalk";
import { inspect as _inspect } from "util";

const log = console.log;
const warning = chalk.yellow;
const error = chalk.red;
const success = chalk.green;

export const logWarn = (...data: any[]) => {
  log(warning(data));
};
export const logError = (...data: any[]) => {
  log(error(data));
};
export const logSuccess = (...data: any[]) => {
  log(success(data));
};
export const inspect = (...data: any[]) => {
  logWarn(_inspect(data, { showHidden: false, depth: null, colors: true }));
};
