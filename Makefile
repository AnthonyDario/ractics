run: 
	python3 -m http.server

deploy: build
	scp -r deploy/* coral:website

build: 
	rm -rf deploy/
	mkdir deploy
	cp -r images deploy/images
	cp -r pages deploy/pages
	cp -r styles deploy/styles
	cp -r js deploy/js
	cp index.html deploy/
