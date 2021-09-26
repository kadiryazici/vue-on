# Vue ON

Collection of `window`/`document` event handlers for composition api. Functions should be used only in `SETUP` phase.
When component unmounts, events are automatically removed from `window`/`document`.

![https://npmjs.com/package/@kadiryazici/vue-on](https://img.shields.io/npm/v/@kadiryazici/vue-on)

# Events

### onBeforeUnload

Same as `window.onbeforeunload`.

```html
<script setup>
   import { onBeforeUnload } from '@kadiryazici/vue-on';
   onBeforeUnload((event /* BeforeUnloadEvent */) => {
      event.preventDefault();
      event.returnValue = '';
      return false;
   });
</script>
```

### onConnectionStatusChange

This is single handler for both `online`/`offline` events in browser.

```html
<script setup>
   import { onConnectionStatusChange } from '@kadiryazici/vue-on';
   onConnectionStatusChange((state /* 'online' | 'offline' */, event: Event) => {
      if (state === 'offline') {
         doSomething();
      } else {
         doAnotherThing();
      }
   });
</script>
```

### onHashChange

Same as `window.onhashchange`.

```html
<script setup>
   import { onHashChange } from '@kadiryazici/vue-on';
   onHashChange((event /* Event */) => {
      ...
   });
</script>
```

### onOrientationChange

Same as `window.ondeviceorientation`.

```html
<script setup>
   import { onOrientationChange } from '@kadiryazici/vue-on';
   onOrientationChange((event /* DeviceOrientationEvent */) => {
      const rotateDegrees = event.alpha;
      const leftToRight = event.gamma;
      const frontToBack = event.beta;
   });
</script>
```

### onPopState

Same as `window.onpopstate`.

```html
<script setup>
   import { onPopState } from '@kadiryazici/vue-on';
   onPopState((event /* PopStateEvent */) => {
      ...
   });
</script>
```

### onVisibilityChange

Same as `window.onvisibilitychange` but first parameter is visibility state.

```html
<script setup>
   import { onVisibilityChange } from '@kadiryazici/vue-on';
   onVisibilityChange((state: /* 'hidden' | 'visible' */, event /* Event */) => {
      ...
   });
</script>
```

### onPaste

Same as `window.onpaste`.

```html
<script setup>
   import { onPaste } from '@kadiryazici/vue-on';
   onPaste((event /* ClipBoardEvent */) => {
      ...
   });
</script>
```
