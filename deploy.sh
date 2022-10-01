#!/usr/bin/env sh

set -e

npm run docs:build
cd docs/.vuepress/dist
echo 'naninovel.com' > CNAME

git init
git config --local core.autocrlf false
git add -A -f
git commit -m 'deploy'
git push -f git@github.com:Naninovel/Documentation.git master:gh-pages

read -r -p "Press Enter key to exit..."
