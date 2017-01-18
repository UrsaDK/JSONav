.DEFAULT: all
.PHONY: all test clean update install build distribute

all: build distribute

test:
	open ./JSONav.safariextension/Global.html

clean:
	git reset --hard
	git submodule foreach reset --hard
	git clean -d --force
	git submodule foreach clean -d --force

update: clean
	git submodule update --recursive --remote

install: update
	if ! type -P npm > /dev/null; then brew install node --with-full-icu --with-openssl; fi
	cd ./highlight.js && npm install
	cd ./linkify.js && npm install

build:
	cd ./highlight.js && node tools/build.js --target browser json
	cd ./linkify.js && ./node_modules/.bin/gulp build && ./node_modules/.bin/gulp dist

distribute:
	mkdir -p ./JSONav.safariextension/vendor/{highlight.js,linkify.js}
	cp -R \
		./highlight.js/build/highlight.pack.js \
		./highlight.js/build/demo/styles \
		./JSONav.safariextension/vendor/highlight.js

