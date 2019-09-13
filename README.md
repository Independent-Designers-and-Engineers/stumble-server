# stumble-server
NodeJS server for IDE's Stumbl app

## Installation Instructions
To get everything setup, run these commands:

```bash
git clone https://github.com/asu-ide/stumble-server.git stumble-server
cd stumble-server
yarn
```

To run the server, be sure to edit the `.env` file with your environment variables. Then, run `yarn start`.

## Development Instructions
After following the above instructions but before you start working on the project, you must create your own branch with `git checkout -b develop-<your name>`.

*Never directly push anything to `master` or `develop`.*

You must also install ESLint, as we will be using it to enforce style with `yarn global add eslint`.

To run in a development environment, use `yarn start:dev`.