BIN=node_modules/.bin/
COFFEE=$(BIN)coffee

all: npm-install

npm-install:
	npm install

test: all
	open test/test.html

.PHONY: test
