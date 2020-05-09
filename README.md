![Naninovel](https://naninovel.com/hero.png) 

# Naninovel Web Resources

This project is used to host online documentation and tracking tools for [Naninovel](https://naninovel.com) visual novel engine.

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
