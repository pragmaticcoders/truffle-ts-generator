# TypeScript-Truffle generator
> Yeoman generator for typescript Truffle project - lets you quickly set up a project with sensible defaults, best practices and tools.

## Usage

Install `yo`:
```
sudo npm install -g yo
```

Clone this repository
```
git clone https://github.com/pragmaticcoders/truffle-ts-generator.git
```

and build it with:
```
npm run compile && sudo npm link
```

Make a directory for your project, and `cd` into it:

```
mkdir my-new-project && cd $_
```

Run generator and answer prompted questions:
```
yo ts-truffle
```


## Generators

Available generators:

* [ts-truffle](#app) (aka [ts-truffle:app](#app))
* [ts-truffle:contracts](#contracts)

### App
Sets up a new TypeScript-Truffle app, generating all the boilerplate you need 
to get started. The app generator also creates config files for pre-installed tools 
(Prettier, TypeScript, Linter, Solhint) and .gitignore file.

Example:
```bash
yo ts-truffle
```

### Contracts
Generates new contracts in `contracts/` with test files ready to develop.

Example:
```bash
yo ts-truffle:contracts
```


## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

When submitting an issue, please follow the [guidelines](https://github.com/yeoman/yeoman/blob/master/contributing.md#issue-submission). 
Especially important is to make sure Yeoman is up-to-date, and providing the command or commands that cause the issue.

When submitting a bugfix, write a test that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

When submitting a new feature, add tests that cover the feature.

## Changelog

soon

## License

[MIT license](http://opensource.org/licenses/mit-license.php)
