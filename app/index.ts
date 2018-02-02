import * as Generator from 'yeoman-generator';

export = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Package name',
          default: this.appname
      },
        {
            type: 'input',
            name: 'version',
            message: 'Version',
            default: '1.0.0'
        },
      {
        type: 'input',
        name: 'description',
        message: 'Description',
      },
        {
            type: 'input',
            name: 'entryPoint',
            message: 'Entry point',
            default: 'index.js'
        },
        {
            type: 'input',
            name: 'testCommand',
            message: 'Test command',
            default: 'npm run compile && truffle test'
        },
        {
            type: 'input',
            name: 'gitRepository',
            message: 'Git repository',
        },
        {
            type: 'input',
            name: 'author',
            message: 'Author',
        },
        {
            type: 'input',
            name: 'authorUrl',
            message: 'Author url',
        },
        {
            type: 'input',
            name: 'license',
            message: 'License',
            default: 'ISC'
        },
      {
        type: 'confirm',
        name: 'contracts',
        message: 'Would you like to add contracts?'
      }
    ]).then(answers => {
      this.props = answers;
      this.log('app name', answers.name);
      if (answers.contracts) {
        return this.prompt([
          {
            type: 'input',
            name: 'contracts_names',
            message: 'Provide contracts names separated by space'
          }
        ]).then(answers => {
            this.log('props', this.props);
          this.log('contracts', answers.contracts_names);
        });
      }
    });
  }

  paths() {

  }

  writing() {
        this._writingConfig();
  }

    _writingConfig() {
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'), {
                props: this.props
            }
        );
        this.fs.copyTpl(
            this.templatePath('_tsconfig.json'),
            this.destinationPath('tsconfig.json'), {
                props: this.props
            }
        );
        this.fs.copyTpl(
            this.templatePath('_tslint.json'),
            this.destinationPath('tslint.json'), {
                props: this.props
            }
        );
        this.fs.copyTpl(
            this.templatePath('_truffle-config.ts'),
            this.destinationPath('truffle-config.ts'), {
                props: this.props
            }
        );
        this.fs.copyTpl(
            this.templatePath('_.prettierignore'),
            this.destinationPath('.prettierignore'), {
                props: this.props
            }
        );
        this.fs.copyTpl(
            this.templatePath('_.prettierrc'),
            this.destinationPath('.prettierrc'), {
                props: this.props
            }
        );
        this.fs.copyTpl(
            this.templatePath('_.gitignore'),
            this.destinationPath('.gitignore'), {
                props: this.props
            }
        );
    }
  // install() {
  //   this.installDependencies();
  // }
};
