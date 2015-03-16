mkdir -p dist/lib/ dist/test/
node_modules/.bin/babel src/index.js --out-file dist/lib/index.js
node_modules/.bin/babel test/test.js --out-file dist/test/test.js
node_modules/.bin/mocha dist/test/test.js
cp ./dist/lib/index.js ./