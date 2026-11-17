---
title: Livewire
description: Use the Blade components in Livewire 4 (and 3) with wire:model, re-renders, and wire:navigate.
seoTitle: "Livewire 4 UI components for Laravel Blade"
seoDescription: "Use MarkasUI Blade components in Livewire 4 and 3: wire:model on every form control, dialogs that stay open on re-render, stable ids, and wire:navigate support."
---

The Blade components work in Livewire 4 without extra setup, and in Livewire 3 the same way. Form controls accept `wire:model`, open dialogs and menus stay open when the component re-renders, and nothing breaks after `wire:navigate`.

## Setup

Follow the [Laravel (Blade) installation](/docs/installation), with one change: **do not install or start Alpine.js yourself.** Livewire ships Alpine and starts it. Loading a second copy makes every `x-data` run twice and breaks `wire:model`.

```bash
npm install tailwindcss @tailwindcss/vite
```

Leave `resources/js/app.js` without any Alpine import. Livewire injects its script on pages that render a component. If a layout has no Livewire component, add `@livewireScripts` before `</body>`.

To register your own Alpine data or plugins, listen for `alpine:init`, which runs before Alpine starts:

```js
document.addEventListener("alpine:init", () => {
  Alpine.data("counter", () => ({ count: 0 }));
});
```

If you bundle Livewire yourself, use `@livewireScriptConfig` in the layout and start it from `app.js`:

```js
import {
  Livewire,
  Alpine,
} from "../../vendor/livewire/livewire/dist/livewire.esm";

Alpine.data("counter", () => ({ count: 0 }));
Livewire.start();
```

No component needs an Alpine plugin. Livewire bundles morph, intersect, collapse, focus, anchor, mask, and resize (Livewire 4 adds sort), so those directives work in your own markup without installing anything.

## wire:model

Every form component takes `wire:model` with the usual modifiers (`.live`, `.blur`, `.change`, `.debounce.300ms`, `.throttle`). There are two patterns, depending on where the value lives.

**Native controls.** The attribute lands on the real `input`, `textarea`, or `select`, so Livewire treats it like plain HTML.

| Component               | Binds                   | Example                                                      |
| ----------------------- | ----------------------- | ------------------------------------------------------------ |
| Input, Textarea, Select | string                  | `<x-markas.input label="Name" wire:model.live="name" />`     |
| Checkbox, Switch        | boolean                 | `<x-markas.switch label="Notify" wire:model="notify" />`     |
| Checkbox with `value`   | array of checked values | `<x-markas.checkbox value="vue" wire:model="tags" />`        |
| Radio group             | selected value          | `<x-markas.radio-group name="plan" wire:model="plan" ... />` |

The radio group copies `wire:model` to each radio.

**Alpine controls.** The value lives in Alpine state, so `wire:model` goes on the component root, which has `x-modelable`. Server changes flow back in: setting `$this->country = 'jp'` shows "Japan" in the combobox.

| Component                   | Binds                                                |
| --------------------------- | ---------------------------------------------------- |
| Slider                      | number                                               |
| Combobox                    | selected value (not the typed text)                  |
| Currency input              | plain number, for example `12500000`                 |
| Input OTP                   | joined code as one string                            |
| Toggle                      | boolean                                              |
| Toggle group                | string or `null` (single), array (`type="multiple"`) |
| Modal, Drawer, Alert dialog | open state (boolean)                                 |
| File dropzone               | uploaded file, or array with `multiple`              |

`x-model` works the same way for plain Alpine.

On Alpine controls, `.blur` and `.enter` listen on the root element and do not fire for the inner input. Use `.live`, `.live.debounce`, or `.change` there.

### Opening dialogs from the server

```blade
<x-markas.modal title="Edit profile" wire:model="showEdit">
    ...
</x-markas.modal>
```

```php
public bool $showEdit = false;

public function save(): void
{
    // ...
    $this->showEdit = false;
}
```

Closing with Escape, the close button, or the backdrop sets the property back to `false`.

### File uploads

Add `use WithFileUploads;` to the component and bind the dropzone:

```blade
<x-markas.file-dropzone multiple accept="image/*" :max-size="5242880" wire:model="photos" />
```

Only files that pass `accept`, `maxSize`, and `maxFiles` are uploaded. Upload progress fills each bar. Validate again on the server.

## Events

Components emit browser events such as `markas-select`, `markas-change`, `markas-action`, and `markas-cancel`. Livewire listens to any event with `wire:` plus the event name:

```blade
<x-markas.dropdown-menu label="Actions" :items="$actions" wire:markas-select="run($event.detail)" />

<x-markas.alert-dialog title="Delete project?" wire:model="confirming" wire:markas-action="delete">
    This cannot be undone.
</x-markas.alert-dialog>
```

`x-on:markas-select="$wire.run($event.detail)"` does the same. `wire:click`, `wire:loading`, and other `wire:` attributes pass through untouched. The events each component emits are listed on its page.

To show a toast from an action, dispatch the toast event. Livewire dispatches it on `window`, where `<x-markas.toast />` listens:

```php
$this->dispatch('markas-toast', title: 'Saved', variant: 'success');
```

## Re-renders

Livewire updates the page by morphing the new HTML into the old one. The components are built so a re-render keeps what the user sees:

- **Ids stay the same.** Generated ids come from the component's `wire:model` (or `wire:key`, or `name`) plus its position, never from a random value. Livewire matches elements by id, so a changing id would replace the element and drop focus while typing. Pass `id` yourself when you need a fixed value, for example to point a `<label>` or `aria-describedby` at it.
- **Open things stay open.** Dialogs, drawers, `details` accordions, and Popover API panels (dropdowns, popovers, tooltips, combobox lists) carry `wire:ignore.self`. Livewire still updates their content, but leaves their open state and position alone. The combobox option list is the exception: Alpine owns it after the first render (see [Performance](#performance)).
- **Alpine state stays.** Active tabs, carousel slides, toggled items, and animation state are not reset.

Components that draw with JavaScript (drag elements, stacking cards, the pixel trail canvas, the theme toggle icon) and generated decorative layers are skipped by the morph entirely with `wire:ignore`.

### Islands

A Livewire 4 `@island` re-renders on its own, so generated ids inside it cannot count on the components around it. Give components inside an island that have no `wire:model` an `id` or a `wire:key`:

```blade
@island(name: 'stats')
    <x-markas.tabs wire:key="stats-tabs" :items="$periods">...</x-markas.tabs>
@endisland
```

### wire:key in lists

Give each item in a loop a `wire:key`, as Livewire recommends. On a MarkasUI component, `wire:key` also seeds the generated id:

```blade
@foreach ($users as $user)
    <x-markas.checkbox wire:key="user-{{ $user->id }}" :label="$user->name" value="{{ $user->id }}" wire:model="selected" />
@endforeach
```

## wire:navigate

Components with global listeners (scroll, resize, the Ctrl+K hotkey, toast events) remove them in Alpine's `destroy()` when the page changes, so navigating back and forth never stacks listeners or opens two dialogs. Components that start on load, such as number tickers or typing text, start again on the new page.

Put shared pieces such as `<x-markas.toast />` or the navbar in the layout. Wrap them in `@persist('toast')` if their state should survive navigation.

## Performance

Every update re-renders the whole Livewire component on the server and morphs the new HTML into the page. Three things decide how fast that feels: Blade work on the server, the size of the HTML sent back, and how many elements the morph walks in the browser.

### On the server

Blade work per component is small: a few class strings and one id lookup, with no query or file access. Most of the time per component is Laravel's own anonymous component handling (about 0.05 to 0.1 ms each on a laptop), so cache everything on deploy:

```bash
composer install --no-dev --optimize-autoloader
php artisan optimize
```

`optimize` caches config, routes, events, and compiled Blade views (`php artisan view:cache` on its own does the views). Keep OPcache on in production. Components copied by the CLI live in `resources/views/components/markas`, which Laravel already resolves as `<x-markas.*>`. If you keep them somewhere else, register that folder once with a prefix instead of including views by path:

```php
// AppServiceProvider::boot()
Blade::anonymousComponentPath(resource_path('views/ui/markas'), 'markas');
```

### Less to send and morph

- Keep `:options` and `:items` to what the user can pick from. They are printed into the HTML (and into Alpine state) on every render. Build them in a `#[Computed]` property so the list is made once per request.
- A Livewire component sends all of its HTML back on every update, even when one unrelated property changed. Split pages into smaller components, or use Livewire 4 `@island` so a re-render only covers the part that changed. Load slow, heavy parts with `lazy` (or Livewire 4 `defer`).
- Decorative layers (stars, sparkles, meteors, beams, background lines and boxes), the theme toggle icon, and the combobox option list are skipped by the morph with `wire:ignore`. They are drawn once and owned by CSS or Alpine after that, so props that shape them (`count`, `seed`, `cols`, `options`) are read on the first render. To redraw one with new props, change its `wire:key`.

### Typing

`wire:model.live` on a text input waits 150 ms after the last key before it calls the server (Livewire's default). The Alpine controls whose value changes while you type or drag (currency input, input OTP, slider) get the same 150 ms debounce when you write `wire:model.live` without your own timing, so a burst of typing sends one request instead of one per key. Write `.debounce.500ms` or `.throttle` to choose your own, and use plain `wire:model` when the value only matters on submit:

```blade
<x-markas.input label="Search" wire:model.live.debounce.250ms="search" />
<x-markas.currency-input label="Amount" wire:model.live="amount" />
```

### x-model inside a Livewire component

Bind Alpine controls to Livewire with `wire:model`. If you bind one to local Alpine state with `x-model` inside a Livewire component, every Livewire update keeps a detached copy of the element alive (an Alpine issue with `x-modelable` during morphs, present up to Alpine 3.17), so memory grows with each update. Prefer `wire:model`, or keep that Alpine state outside the Livewire component.

### Budgets

`pnpm test:livewire` measures every component in a Laravel app with these caches on: Blade render time, HTML bytes (raw and gzip), Alpine attribute bytes, elements the morph walks, Alpine init and morph time, listener and DOM growth over 20 updates, and requests per typing burst. Byte and element counts are budgeted exactly in `tests/livewire/perf-budgets.json`, timings with generous limits.

## Livewire 3

Everything above works in Livewire 3.6 and later. The differences are on Livewire's side:

- Livewire 4 registers full page routes with `Route::livewire()`. In Livewire 3 use `Route::get('/path', Component::class)`.
- Livewire 4 adds islands, single file components, and `wire:ref`. They do not change how the components behave.
- Both versions match elements during morphing by `wire:key`, `wire:id`, and finally `id` (Livewire 3 checks `wire:key` first, Livewire 4 checks `wire:id` first), which is why stable ids matter in both.
- Livewire 3 does not bundle the Alpine sort plugin. No component uses it.

Every change is tested in CI against Livewire 3 and 4 inside a fresh Laravel app: each component re-renders without losing elements or state, form controls bind both ways, and `wire:navigate` adds no listeners. Run the same checks with `pnpm test:livewire` (`LIVEWIRE=3` for version 3).
