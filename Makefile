BIN=node_modules/.bin/
COFFEE=$(BIN)coffee
UGLIFYJS=$(BIN)uglifyjs

all: dist/dpr.js test/test.js

dist/dpr.js: lib/dpr.coffee
	$(COFFEE) -p lib/dpr.coffee | $(UGLIFYJS) > dist/dpr.js

test: all test/test.js
	open test/test.html

test/test.js: test/test.coffee
	$(COFFEE) -cb -o test test

dev:
	$(COFFEE) support/dev

.PHONY: all test
