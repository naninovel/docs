sed -i -e "s/link.baseURI);/link.baseURI);\nif (href.starsWith('https:')) return;/g" node_modules/vitepress/dist/client/app/router.js
