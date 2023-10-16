#!/usr/bin/env node
const path = require('path');
const fsPromises = require('fs/promises');
const { spawn } = require('child_process');
const chalk = require('chalk');

(async () => {
  const projectName = process.argv[2];
  
  /** 复制文件夹及中所有资源 */
  const copyFileToTarget = async (sourcePath, targetPath) => {
    const sourceFile = await fsPromises.stat(sourcePath);

    if (sourceFile.isFile()) {
      return;
    }

    const files = await fsPromises.readdir(sourcePath);

    files.forEach(async file => {
      const sourceFile = `${sourcePath}/${file}`;
      const targetFile = `${targetPath}/${file}`;

      const curFile = await fsPromises.stat(sourceFile);

      if (curFile.isFile()) {
        await fsPromises.copyFile(sourceFile, targetFile);

        if (file === 'package.json') {
          const content = await fsPromises.readFile(targetFile, 'utf-8');
          const updateContent = content.replace('cgp-app-name', projectName);
          fsPromises.writeFile(targetFile, updateContent, 'utf-8');
        }

        return;
      } 
      await fsPromises.mkdir(targetFile);
      copyFileToTarget(sourceFile, targetFile);
    });
  };

  const source = path.resolve(__dirname, '../assets');
  const target = path.resolve(process.cwd(), `./${projectName}`);
  console.log(chalk.green(`you are Creating a new cgp-app in ${target}`));
  console.log(chalk.green('Installing packages. This might take a couple of minutes.'));

  await fsPromises.mkdir(target);

  await copyFileToTarget(source, target);
  
  // 初始化生成项目
  const command = `cd ${target} && yarn`;
  const child = spawn(command, { shell: true });

  child.stdout.on('data', (data) => {
    console.log(chalk.green(data));
  });

  child.stderr.on('data', (data) => {
    console.error(chalk.yellowBright(data));
  });

  child.on('close', (code) => {
    console.log(chalk.green(`Success! Created ${projectName} at ${target}`));
    console.log(chalk.green(`you can run several commands`));
    console.log(`${chalk.blueBright('yarn start')}\nstart development server defaultport 9003\n${chalk.blueBright('yarn build')}\n build production assets\n${chalk.blueBright('yarn test')}\nrun jest test runner --watch\n${chalk.blueBright('yarn e2e:test')}\nrun cypress e2e test`);
    console.log(chalk.green('happy coding'));
  });
})();



