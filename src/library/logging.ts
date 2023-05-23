import chalk from 'chalk';

export default class Logging {
  public static log = (message: string) => {
    this.info(message);
  };

  public static info = (message: string) => {
    console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO] - ${message}`));
  };
  public static warn = (message: string) => {
    console.log(chalk.yellow(`[${new Date().toLocaleString()}] [WARN] - ${message}`));
  };
  public static error = (message: string) => {
    console.log(chalk.red(`[${new Date().toLocaleString()}] [ERROR] - ${message}`));
  };
}
