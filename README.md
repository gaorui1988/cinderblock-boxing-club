# Cinderblock Boxing Club

A two-page site for a boutique boxing and strength gym in Oakland. It is built from the VibeFather template [Boxing and Strength Gym Website](https://vibefather.ai/templates/boxing-and-strength-gym-website): a long home page and a filterable weekly timetable.

The trial form stays in the browser. Nothing is sent, stored, or booked.

## Run it

```bash
npm install
npm run dev
```

The dev server listens on port 4731. Open the home page, then `timetable.html` for the week.

```bash
npm run build
npm run preview
```

`npm run build` typechecks and writes a static site to `dist/`.

## Pages

- `index.html` — hero, classes, today’s floor, membership, coaches, results, free-trial form, FAQ, visit
- `timetable.html` — filters, desktop week grid, mobile day list, class drawer, house rules

Defaults from the template: Cinderblock Boxing Club, boxing and strength training, Oakland, California, busy adults from first-timers to amateur fighters. The footer keeps the VibeFather credit.

The template is CC BY-NC 4.0. Commercial use needs a [VibeFather Pro](https://vibefather.ai/pricing) license.
