# GUS Mortality Data Browser

## What?

Poland's mortality rates data browser - numbers provided by GUS via [custom made API](https://github.com/jakubtelec/gus-mortality-api).

Avaible period: 2000 - 2021, data aggregated weekly [(ISO 8601 week dates norm)](https://en.wikipedia.org/wiki/ISO_8601#Week_dates).

## Stack

- built with <3 [Svelte](https://svelte.dev) framework <3 (on top of this [template](https://github.com/sveltejs/template))
- **chart.js** port for Svelte - [svelte-chartjs](https://saurav.tech/mdbsvelte/?path=/story/charts--installation)
- **Select** for Svelte - [svelte-select](https://github.com/rob-balfre/svelte-select)
- drag and drop for Svelte - [svelte-dnd-action](https://github.com/isaacHagoel/svelte-dnd-action)

## Resources

- [Feather icons](https://feathericons.com/)

### TODO:

- [ ] custom presets saving/loading (local storage)
- [ ] more presets
- [ ] mobile UI
