# Chumi Geo Tag

Put a place, an address and a time on any photo. Choose one photo or a whole batch, set the location from an address, a Google Maps link, coordinates or a pin on the map, pick the date and time, and download the photo with a geotag stamp drawn on it.

It is one static page, built in plain HTML, CSS and JavaScript. It runs entirely in the browser, needs no server and no account, and **your photo is never uploaded**.

## What it does

- **Location from anything:** an address, a full Google Maps link (place links, `?q=`, `ll=`, `@lat,lng`), plain or degrees-minutes-seconds coordinates, a click or drag on the map, or your device location.
- **Stamp on the photo:** place name, address, coordinates, date and time, an optional note, and a map thumbnail. Three layouts (map card, strip, text only), top or bottom, dark or light, adjustable size.
- **Four map thumbnail designs:** Street (full-colour map, square, pin), Mono (grey map, square, target dot), Night (dark map, round, pin) and Satellite (aerial imagery, square, pin). Pick one from the style cards, which preview each design with your location.
- **Date and time:** any date, time and time zone, in four date styles.
- **Real geotag in the file:** JPEG downloads also carry the GPS position, date and time zone in their EXIF data, so gallery apps and maps place the photo correctly.
- **Edits an existing geotag:** if the photo already has a location or date in its EXIF data, they load as the starting point.
- **Batches:** choose, drop or paste many photos at once (up to 60). Thumbnails let you check each one, with previous and next arrows on the preview. The same place, text, style and date go on every photo. Optionally keep each photo's own date and time when its camera data has one.
- **Output:** JPEG (quality control) or PNG, capped at 4096 px on the long side or at the original size. A batch downloads as one ZIP of stamped photos, or as one **PDF**: A4 pages with 1, 2 or 4 photos each, or pages shaped like each photo. "Only this one" saves just the photo you are looking at.
- **Landing page, About and copyright details:** the site opens on a short landing page (a live sample of the stamp, how it works, About, credits and licences). The tool itself is at `#app`, for example `https://<your-username>.github.io/geotag-stamp/#app`.
- **Rating:** visitors rate the site from 1 to 5 stars. The rating is saved on their own device. They can add a note and send it to you as a prefilled GitHub issue, or copy it.
- **Share:** native share sheet where the device has one, plus WhatsApp, Telegram, X, Facebook, Email and copy link.
- **Map-drawn backgrounds:** the four thumbnail styles double as the page's grounds. They are drawn in flat colour, in code, with no images and no gradients: a street map behind the hero, a red route threading the three steps, a night map around the photo and in the tool's preview area, a mono map behind the features, and satellite-style aerial texture behind About. Text sits on a flat wash so it stays readable.
- **Loading animation:** a short pin-drop intro (once per browser tab session), staggered entrances, a progress bar while a photo opens, a place is searched or a file is saved, and tiles that fade in. All of it is switched off for visitors who prefer reduced motion.

## Publish it on GitHub Pages

1. Create a new **public** repository on GitHub, for example `geotag-stamp`.
2. Upload everything in this folder to it (drag the files onto the repository page, or use git, below).
3. In the repository, open **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose branch **main** and folder **/ (root)**, and save.
4. After a minute the site is live at `https://<your-username>.github.io/geotag-stamp/`.

With git:

```bash
git init -b main
git add .
git commit -m "Chumi Geo Tag"
git remote add origin https://github.com/<your-username>/geotag-stamp.git
git push -u origin main
```

With the GitHub CLI, in one step:

```bash
git init -b main && git add . && git commit -m "Chumi Geo Tag"
gh repo create geotag-stamp --public --source=. --push
gh api -X POST repos/{owner}/geotag-stamp/pages -f "source[branch]=main" -f "source[path]=/"
```

The file Pages serves is `index.html` in the repository root. It is self-contained (fonts included), so it also works opened straight from disk or from any other static host.

## Privacy

- The photo is read and drawn on in your browser. It is not sent anywhere.
- Only the text you search for, or the coordinates of the pin, are sent to the address search service (OpenStreetMap Nominatim, with Photon as a backup). Map tiles are fetched from OpenStreetMap, and satellite tiles from Esri.
- The page ships a Content-Security-Policy that allows connections to those services and nothing else, so the page cannot send your photo elsewhere even by mistake.

## Using other map or search providers

The three outside services are listed in one `CONFIG` block near the top of the script in `src/app.html`:

```js
const CONFIG = {
  nominatim: 'https://nominatim.openstreetmap.org',
  photon: 'https://photon.komoot.io',
  tiles: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  siteUrl: 'https://<your-username>.github.io/geotag-stamp/',   // used when the page is opened from a file or localhost
  repo: 'https://github.com/<your-username>/geotag-stamp',       // where "Send on GitHub" opens an issue
  contactEmail: '',
};
```

If you change a host, add it to the Content-Security-Policy `<meta>` in the `<head>` too (`connect-src` for search, `img-src` for tiles). The browser blocks anything not listed.

**Fair use.** OpenStreetMap's public servers are free for light use. A busy public site should follow the [Nominatim usage policy](https://operations.osmfoundation.org/policies/nominatim/) and the [tile usage policy](https://operations.osmfoundation.org/policies/tiles/): set `contactEmail` so requests identify your site, and move to your own or a commercial provider if traffic grows. This page only searches when someone presses Find place and never searches as you type.

**Satellite imagery** comes from Esri's public World Imagery tile service and carries Esri's attribution on the thumbnail. That is fine for light, non-commercial use; for a busy or commercial site, check [Esri's terms](https://www.esri.com/en-us/legal/terms/full-master-agreement) and use your own key or another imagery provider. Coverage and detail vary by place.

## Change it and rebuild

`index.html` is generated. Edit `src/app.html`, then run:

```bash
node tools/build.mjs
```

The build needs Node 18 or newer and no packages. It inlines the fonts and recomputes the Content-Security-Policy hashes, so rebuild after any change to the script or styles, then commit `index.html` along with the source.

Layout of the repository:

| Path | What it is |
| --- | --- |
| `index.html` | The built page that GitHub Pages serves. |
| `src/app.html` | The source: markup, styles and script in one file. |
| `fonts/` | Instrument Sans, Latin subset (Regular and Bold), and its licence. |
| `tools/build.mjs` | Inlines the fonts and fills in the policy hashes. |

To re-create the font subsets from the full font files (needs `pip install fonttools`):

```bash
pyftsubset InstrumentSans-Regular.ttf --unicodes="U+0020-007E,U+00A0-00FF,U+2013,U+2014,U+2018,U+2019,U+201C,U+201D,U+2022,U+2026,U+00B0,U+2032,U+2033,U+00B7,U+2192,U+2190,U+00D7" --layout-features='kern,liga,tnum,lnum' --flavor=woff --output-file=fonts/InstrumentSans-Regular.subset.woff
```

## Limits

- A batch holds up to 60 photos. Photos are decoded one at a time while saving, to keep memory low on phones, so a big batch of full-size photos can take a while.
- PDF pages hold the stamped photos as JPEGs; the location and time in the file data (EXIF) go into ZIP and image downloads, not the PDF.
- Short Google links (`maps.app.goo.gl`) cannot be opened from a web page. Paste the full link from the browser's address bar instead.
- Address search is OpenStreetMap-based, not Google's, so a few places may be named differently.
- Saving as JPEG writes a fresh EXIF block with location and time only. Other camera details from the original photo are not carried over.
- HEIC photos open only in browsers that can decode them (Safari, and most phones convert them to JPEG on upload).
- "Use my location" needs a secure page, which GitHub Pages is.
- Ratings are stored on each visitor's own device, so there is no public average. To collect ratings in one place you would need a small backend, for example a form service or a database.
- Google's own map imagery and logo are not used: they need Google's paid Maps API and terms. Satellite thumbnails use Esri imagery instead.

## Credits and licences

- Code: [MIT](LICENSE).
- Font: Instrument Sans, SIL Open Font License 1.1 (`fonts/OFL.txt`).
- Map data and tiles: © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), ODbL. The credit is shown on the map and on the stamp's map thumbnail.
- Satellite imagery: © Esri, Maxar, Earthstar Geographics and the GIS User Community. The credit is shown on the satellite thumbnail and in the page footer.
- Address search: [Nominatim](https://nominatim.org/) and [Photon](https://photon.komoot.io/) (both OpenStreetMap data).
