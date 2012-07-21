BIN=node_modules/.bin/
COFFEE=$(BIN)coffee
UGLIFYJS=$(BIN)uglifyjs

all: dpr.js

dpr.js: dpr.coffee
	$(COFFEE) -p dpr.coffee | $(UGLIFYJS) > dpr.js

test/test.js: test/test.coffee
	$(COFFEE) -pb test/test.coffee > test/test.js

test: dpr.js test/test.js
	open test/test.html

.PHONY: all test
