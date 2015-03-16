mkdir -p dist/lib/ dist/test/
babel src/index.js --out-file dist/lib/index.js
babel test/test.js --out-file dist/test/test.js
mocha dist/test/test.js
cp ./dist/lib/index.js ./