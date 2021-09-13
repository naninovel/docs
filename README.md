![Naninovel](https://i.gyazo.com/4055ab9b307201c3be049835943d4dc4.png) 

# Naninovel Web Resources

This project is used to host online documentation and tracking tools for [Naninovel](https://naninovel.com) visual novel engine.

## How to Run Locally

1. Install nodejs https://nodejs.org
2. Fork this repository on Github
3. Install npm dependencies
```$
npm install
```
4. Build the project
```$
npm run docs:build
```
5. Launch local web server
```$
npm run docs:dev
```
6. Access with a web browser http://localhost:8080/

## How to Upgrade VuePress

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
