# https://github.com/vuejs/vitepress/issues/3264
sed -i -e "s/link.baseURI);/link.baseURI);\nif (link?.href?.startsWith('https:')) return;/g" node_modules/vitepress/dist/client/app/router.js
