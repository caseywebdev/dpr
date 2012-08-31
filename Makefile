BIN=node_modules/.bin/
COFFEE=$(BIN)coffee

all: npm-install compile-lib compile-test

npm-install:
	npm install

compile-lib:
	$(COFFEE) -c -o dist lib

compile-lib-w:
	$(COFFEE) -cw -o dist lib

compile-test:
	$(COFFEE) -c test

compile-test-w:
	$(COFFEE) -cw test

dev:
	make -j dev-j

dev-j: compile-lib-w compile-test-w

test: all
	open test/test.html

.PHONY: test
