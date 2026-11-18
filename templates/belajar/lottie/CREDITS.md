# Lottie animations

Line drawings used by the belajar page. Each JSON file was downloaded from LottieFiles, cleaned (layer
names removed, numbers rounded) and left otherwise unchanged, except `certificate.json`, whose stroke
widths were reduced to match the other three. The page recolours the strokes with CSS (`text-primary` in
the hero, `text-ink` in the steps), so the files keep their original black.

| File               | Animation                               | Author          | Source                                                                               | License               |
| ------------------ | --------------------------------------- | --------------- | ------------------------------------------------------------------------------------ | --------------------- |
| `hero.json`        | Video Learning Tutorial                 | Eleven Gates    | https://lottiefiles.com/animations/video-learning-tutorial-m5sVLWyPIG                | Lottie Simple License |
| `study.json`       | E learning Animation, Online News Paper | Eleven Gates    | https://lottiefiles.com/animations/e-learning-animation-online-news-paper-0zoKl9JPQO | Lottie Simple License |
| `mentor.json`      | Online Teacher                          | Eleven Gates    | https://lottiefiles.com/animations/online-teacher-0QJHstyssH                         | Lottie Simple License |
| `certificate.json` | Certificate line art                    | AZNAF Creations | https://lottiefiles.com/animations/certificate-line-art-XXp81Vva5o                   | Lottie Simple License |

The Lottie Simple License allows use, changes, and redistribution, including commercial use.
Attribution is not required but encouraged, which is why the authors are listed here. Redistributed
files stay under the same license: https://lottiefiles.com/page/license

## Using the page in your project

- Install the player: `npm i lottie-web`. Only the light SVG build (`lottie-web/build/player/lottie_light`)
  is loaded, through a dynamic import, after the page renders.
- React, Vue, Svelte, Astro, and Angular import `../lottie/player.ts`, which loads the player and the JSON
  files next to it. Copy the whole `lottie` folder next to the page.
- Blade fetches the JSON from `/lottie/belajar/<name>.json` (copy the files to `public/lottie/belajar/`) and
  calls `window.loadLottie`. Register it once in `resources/js/app.js`:

  ```js
  window.loadLottie = () =>
    import("lottie-web/build/player/lottie_light").then(
      (module) => module.default,
    );
  ```

  Without it, the drawing boxes stay empty and the rest of the page works as usual.

- Every animation plays once when it scrolls into view, pauses off-screen, and shows the finished drawing
  when the visitor prefers reduced motion.
