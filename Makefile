
.PHONY: package deploy build test

#binaries
TSC=npx tsc
TSLINT=npx eslint --ext .ts

#source dir
TS_DIRS=./src

#source files
TS_SRC ::= $(shell find $(TS_DIRS) -name '*.ts')

#compilation options/binary flags
TSC_FLAGS = 

#out dir
JS_OUTDIR=./dist

#outfiles
JS_OUT ::= $(patsubst %.ts, $(JS_OUTDIR)/%.js, $(TS_SRC))

#package zipfile
LAMBDA_PACKAGE=./function.zip

$(JS_OUTDIR):
	mkdir -p $(JS_OUTDIR)

build: $(JS_OUTDIR) $(word 1, $(JS_OUT))

$(word 1, $(JS_OUT)): $(TS_SRC)
	$(TSLINT) $?
	$(TSC) $(TSC_FLAGS)

package: $(LAMBDA_PACKAGE)

package_lock.json: package.json
	npm install

$(JS_OUTDIR)/node_modules/: package-lock.json
	cp package.json package-lock.json $(JS_OUTDIR); \
	cd $(JS_OUTDIR); \
	npm install --production; \
	rm package.json package-lock.json; \
	cd ..

$(LAMBDA_PACKAGE): $(JS_OUTDIR)/node_modules/ $(word 1, $(JS_OUT))
	cd $(JS_OUTDIR); \
	zip -r $(LAMBDA_PACKAGE) .; \
	mv $(LAMBDA_PACKAGE) ../

deploy: $(LAMBDA_PACKAGE)
	aws lambda update-function-code --function-name hello_lambda_handler --zip-file fileb://$(LAMBDA_PACKAGE)

test:
	npx mocha