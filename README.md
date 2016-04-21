# b.oilerplate
Yet another Node.js and GruntJS boilerplate, which cool features like

* living styleguide generator with node-kss and [bkss](https://github.com/blateral/bkss) template
* deploy your files with grunt-sftp-deploy
* node-sass through grunt-sass
* autoprefixer
* ES6/ES2015 ready 
* ESlint
* static site generator (Assamble.io) included for quick prototyping
* you name it

<3 b.lateral

## Getting started
This boilerplate is built upon node.js, npm and Grunt. So make sure, these tools and their dependencies are installed before trying to build anything.

Run `npm install` from your project root directory

### Developing
1. Run `npm start`

### Building
1. Run `npm run build`

### Deploying
1. Run `npm run deploy`

**Note:**<br>
If you want to deploy, make sure you set your correct SFTP credentials (see [settings.json](https://github.com/blateral/b.oilerplate/blob/master/settings.json#L50))
