![Naninovel](https://github.com/Elringus/NaninovelWeb/blob/master/docs/.vuepress/public/assets/img/og.jpg) 

# Naninovel Web Resources

This project is used to host online documentation and tracking tools for [Naninovel](https://naninovel.com) visual novel engine.

## Require
- nodejs

## Setup
1. Fork this repository on Github
2. Install npm
```$
npm install
```
3. Build documentation in local environment
```$
npm run docs:build
```
4. Launch the document in the local environment
```$
npm run docs:dev
```
5. Access with a browser http://localhost:8080/

## VuePress Upgrade

1. Delete `docs/.vuepress/theme`
2. Upgrade vuepress
3. Run `yarn run eject`
4. Edit `theme/Navbar.vue` replacing
```
<RouterLink
  :to="$localePath"
  class="home-link"
>
...
</RouterLink>
```
with

```
<a href="https://naninovel.com">
...
</a>
```
5. Edit `theme/layouts/404.vue` replacing
```
<RouterLink to="/">
...
</RouterLink>
```
with
```
<a href="https://naninovel.com">
...
</a>
```
