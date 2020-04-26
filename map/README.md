# Modern JS Scaffold

Scaffold from Andrew McNutt(https://github.com/mcnuttandrew)

## Setup

```sh
npm install
# then
npm run start

# or if yarn-ing
yarn
# then
yarn start
```

You will still need to be explicit about your imports, eg
```js
import {functionFromModule} from 'target-module';
```

To install packages,

```sh
npm install --save PACKAGENAME

# or if yarning
yarn add PACKAGENAME
```


## Usage

Development:

Step 1: Do all of your work in src. There is no step 2.

Production:

There are currently two easy ways to deploy this scaffold onto the internet.  

### Netlify

Netlify is an excellent company that tries to make the dev process as easy as possible. The way you deploy this scaffold there is get an account, start a new project, point it to the relevant github folder (that contains just this scaffold!), set the build command to be 'yarn build' and that's it.


### GH Pages

gh-pages is a wonderful resource for doing web-development, and allows you to have classy YOU_PERSONAL_DOMAIN/projectname type links. You can deploy this scaffold there by running 'yarn build' in your command line, commiting the modified file, and push to github. If you've configured your projects settings correct it should all just work out.