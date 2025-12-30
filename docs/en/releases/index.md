---
aside: false
---

<script setup>
const copy = evt => {
    const button = evt.target;
    navigator.clipboard.writeText(button.title);
    button.classList.add("upm-clicked");
    setTimeout(() => button.classList.remove("upm-clicked"), 3000);
};
</script>

# Releases

| Version |  Date   |                Status                 |   <abbr title="Compatible Unity versions.">Unity</abbr>    | <abbr title="Git URL of the release package to install via Unity's package manager (UPM).">UPM</abbr> |                    Notes                    |
|:-------:|:-------:|:-------------------------------------:|:----------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------:|:-------------------------------------------:|
| `1.21`  |   TBD   | <span class="txt-warn">Preview</span> |                        `6.0`, `6.3`                        |         <button @click="copy" class="upm" title="https://github.com/naninovel/upm.git#1.21"/>         | [](https://pre.naninovel.com/releases/1.21) |
| `1.20`  | Q4 2024 |  <span class="txt-ok">Stable</span>   |                        `2022 - 6.0`                        |         <button @click="copy" class="upm" title="https://github.com/naninovel/upm.git#1.20"/>         |             [↗](/releases/1.20)             |
| `1.19`  | Q4 2023 |  <span class="txt-err">Final</span>   |                       `2019 - 2022`                        |                                                  `-`                                                  |             [↗](/releases/1.19)             |
| `1.18`  | Q4 2022 |  <span class="txt-err">Final</span>   |                       `2019 - 2021`                        |                                                  `-`                                                  |             [↗](/releases/1.18)             |
