.PHONY: api

api:
	yarn install && \
	npx redoc-cli bundle api/openapi.yml && \
	rm -rf api-dist && \
	mkdir api-dist && \
	cp redoc-static.html api-dist/index.html && \
	rm redoc-static.html && \
	cp api/data/* api-dist/ && \
	node scripts/generate-data.js && \
	mv organizations.json api-dist && \
	npx prettier --write api-dist/organizations.json
