# b.oilerplate
This is our internal front end boilerplate at [b.lateral](https://blateral.com). It's fully based on `webpack` and encourages a style guide driven css development.

## Features (not all implemented yet)
- [x] Webpack
- [x] Hot Reloading
- [x] Static site builder with `kss`
- [x] Living Styleguide generator
- [x] Sass
- [x] Simple asset loading with `file-loader`
- [x] ESnext
- [ ] Jest
- [ ] Upgrading to `kss@3.x.x`

## Getting started

As `npm` still works with this boilerplate, we strongly encourage you to use `yarn` due to faster install time.

### Clone
```bash
mkdir nice-project
cd nice-project
git clone https://github.com/blateral/b.oilerplate.git .
```

### Prepare
Remove any previous version control which comes with the `git clone` and initialize a new empty git repository

```bash
rm -rf .git
git init
```

### Developing
```bash
yarn start
```

### Building
```bash
yarn run build
```



