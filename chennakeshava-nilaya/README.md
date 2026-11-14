# Chennakeshava Nilaya (SRK Nivas) – Premium Residential Website

A boutique, responsive, lightweight static website crafted for **Chennakesava Nilaya (SRK Nivas)**, a residential rental property located on Joe Avenue, Green Glen Layout, Bellandur, Bengaluru, Karnataka &ndash; 560103.

Designed specifically for immediate mobile accessibility via a **QR code printed on physical visiting cards**, this website adheres to high-end architectural real-estate design principles: warm ivory palette, champagne gold accents, Cormorant Garamond typography, editorial layout, and zero external framework bloat.

---

## 1. Technology Stack

- **HTML5**: Semantic, accessible markup with Open Graph & SEO meta tags.
- **CSS3**: Custom properties (CSS variables), responsive clamp typography, smooth transitions, mobile-first layouts, and reduced-motion media query support.
- **Vanilla JavaScript**: Lightweight modular scripts for mobile navigation, sticky elevation, intersection observers, YouTube embedding, and full-screen gallery lightbox.
- **Typography**: Google Fonts (*Cormorant Garamond* for headings, *Inter* for body text).
- **Strictly No Frameworks**: Zero React, Vue, Angular, Bootstrap, Tailwind, jQuery, or Node.js runtime required.

---

## 2. Directory Structure

```text
chennakeshava-nilaya/
│
├── index.html                      # Primary landing page
├── css/
│   └── style.css                   # Complete design system & responsive styling
├── js/
│   ├── main.js                     # Navigation, scroll observers, YouTube video loader
│   └── gallery.js                  # Gallery rendering, category filter, lightbox modal
├── images/
│   ├── hero/
│   │   └── hero-placeholder.svg   # High-resolution hero image / placeholder
│   ├── intro/
│   │   └── intro-building.svg      # Property overview visual
│   ├── 1bhk/
│   │   ├── 1bhk-hall-sofa.jpg      # Furnished living room with sofa
│   │   ├── 1bhk-bedroom.jpg        # Master bedroom
│   │   ├── 1bhk-kitchen.jpg        # Kitchen & utility area
│   │   ├── 1bhk-bathroom.jpg       # Tiled bathroom & geyser
│   │   ├── 1bhk-balcony.jpg        # Private balcony
│   │   ├── 1bhk-common-lift.jpg    # Corridor & elevator access
│   │   ├── 1bhk-entrance.jpg       # Unit entrance
│   │   └── 1bhk-main.svg           # Vector placeholder fallback
│   ├── 1rk/
│   │   ├── 1rk-main.jpg            # Furnished 1 RK studio room
│   │   ├── 1rk-room.jpg            # 1 RK interior & bed layout
│   │   ├── 1rk-main.svg            # Vector placeholder fallback
│   │   └── 1rk-interior.svg        # Vector placeholder fallback
│   ├── amenities/                  # Minimal vector iconography
│   └── gallery/
│       ├── gallery-exterior-1.svg  # Façade placeholder
│       └── gallery-exterior-2.svg  # Elevation placeholder
├── favicon/
│   └── favicon.svg                 # Brandmark favicon
└── README.md                       # Documentation & deployment guide
```

---

## 3. How to Replace Photographs

All image paths are organized into dedicated folders under `images/`.

### Replacing the Hero Background / Elevation Image
1. Prepare an architectural photo of the building exterior (recommended resolution: `1600 × 1000px`, JPG or WebP, under 400 KB for optimal mobile speed).
2. Save it as `images/hero/building-hero.jpg`.
3. In `index.html`, update line 83:
   ```html
   <img src="images/hero/building-hero.jpg" alt="Chennakesava Nilaya residential building exterior in Bellandur" ... >
   ```

### Updating Residence Photos
- **1 BHK**: Drop new photos into `images/1bhk/` (e.g. `images/1bhk/1bhk-hall-sofa.jpg`).
- **1 RK**: Drop new photos into `images/1rk/` (e.g. `images/1rk/1rk-main.jpg`).

### Managing the Photo Gallery & Categories
In `js/gallery.js`, each image is an entry in the `galleryItems` array:

```javascript
{
  id: 1,
  title: "1 BHK Living Room with Sofa",
  category: "living",             // Available filters: 'exterior', 'living', 'bedrooms', 'kitchen', 'bathrooms', 'common'
  categoryLabel: "Living Spaces",
  src: "images/1bhk/1bhk-hall-sofa.jpg",
  alt: "Furnished 1 BHK living room with sofa at Chennakesava Nilaya",
  aspectClass: "wide"             // 'standard' (4:3), 'wide' (16:9), or 'tall' (3:4)
}
```

To add a new image to the gallery, simply append a new object to `galleryItems` in `js/gallery.js`.

---

## 4. How to Add or Change YouTube Videos

YouTube video embedding is configured via a JavaScript data array at the top of `js/main.js`:

```javascript
const propertyVideos = [
  {
    id: "D2yC-GHGojs",  // Extract from: https://www.youtube.com/watch?v=D2yC-GHGojs
    title: "Property Walkthrough – Chennakesava Nilaya",
    subtitle: "Video Tour of Residential Spaces in Bellandur, Bengaluru",
    description: "A walkthrough of Chennakesava Nilaya (SRK Nivas) showcasing the building exterior, amenities and furnished residential units."
  }
];
```

The player uses `https://www.youtube-nocookie.com/embed/<VIDEO_ID>` for enhanced privacy and loads lazily to maintain rapid initial page rendering for mobile users.

---

## 5. Deployment Instructions

### Method A: Deploying on Vercel (Recommended)

Because this is a pure static website, Vercel deploys it with zero configuration in under 30 seconds.

#### Option 1: Via Vercel Web Dashboard (Drag & Drop or GitHub)
1. Sign in to [Vercel](https://vercel.com/).
2. Click **Add New** &rarr; **Project**.
3. **If using Git**: Import your repository (`Chennakeshava`). Leave all build commands empty and Framework Preset as **Other**. Click **Deploy**.
4. **If uploading files directly**: Go to [vercel.com/new](https://vercel.com/new), drag and drop the project folder directly into the browser, and click **Deploy**.

#### Option 2: Via Vercel CLI
```bash
# Install Vercel CLI globally (if Node.js is installed)
npm install -g vercel

# From the project root:
vercel --prod
```

---

### Method B: Deploying on GitHub Pages

1. Push this folder to a GitHub repository (e.g. `username/chennakeshava-nilaya`).
2. Go to **Settings** &rarr; **Pages**.
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: `main` / `master`, Folder: `/ (root)`
4. Click **Save**. Within 1–2 minutes, your website will be live at `https://<username>.github.io/chennakeshava-nilaya/`.

---

## 6. Connecting a Custom Domain

Once deployed to Vercel:

1. In the Vercel Project Dashboard, navigate to **Settings** &rarr; **Domains**.
2. Enter your custom domain (e.g., `chennakeshavanilaya.com` or `srknivas.in`) and click **Add**.
3. Log in to your domain registrar (GoDaddy, Namecheap, Google Domains / Squarespace, Cloudflare):
   - **For apex domain** (`example.com`): Add an `A` record pointing to Vercel's IP:
     - **Type**: `A`
     - **Name**: `@`
     - **Value**: `76.76.21.21`
   - **For subdomain / www** (`www.example.com`): Add a `CNAME` record:
     - **Type**: `CNAME`
     - **Name**: `www`
     - **Value**: `cname.vercel-dns.com`
4. Vercel automatically provisions a free SSL certificate (HTTPS) once DNS propagation completes (usually within 15–30 minutes).

---

## 7. Generating a Permanent QR Code for Visiting Cards

Once your website is deployed to its final domain:

1. **Copy the Final URL**:
   Ensure you use the canonical HTTPS URL (e.g. `https://chennakeshavanilaya.com` or your `*.vercel.app` URL).
2. **Use a High-Quality Vector QR Code Generator**:
   - Services like [QRCode Monkey](https://www.qrcode-monkey.com/) or [QR Code Generator](https://www.qr-code-generator.com/) allow vector export (`SVG` or `EPS`).
   - Use high resolution (`300 DPI` or vector) for crisp physical card printing.
3. **Print Best Practices**:
   - **Error Correction Level**: Set to **Medium (M)** or **High (H)** so that minor scratches or smudges on the visiting card do not prevent scanning.
   - **Quiet Zone**: Keep a clear margin around the QR code of at least 4 module widths (empty white border).
   - **Color Contrast**: Use dark charcoal (`#292A27`) on warm ivory or white background. Avoid light or metallic colors for QR code patterns as phone cameras may struggle with glare.
   - **Physical Size**: Minimum recommended print size on visiting cards is `20 mm × 20 mm` (0.8 × 0.8 inches) for reliable scanning on all smartphones.

---

## 8. Property Details Reference

- **Property Name**: Chennakesava Nilaya (SRK Nivas)
- **Address**: SRK Nivas, Joe Ave, Green Glen Layout, Bellandur, Bengaluru &ndash; 560103.
- **Direct Phone**: `+91 8074896926`
- **WhatsApp Direct**: `https://wa.me/918074896926`
- **Units**:
  - **1 BHK**: ₹35,000/month (Maintenance included, Security Deposit ₹1,05,000, 11-month agreement, Furnished with Refrigerator, Washing Machine, TV, Sofa, Bed).
  - **1 RK**: ₹25,000/month (Maintenance separate/unconfirmed, Security Deposit ₹75,000, 11-month agreement, Furnished with Refrigerator, Washing Machine, TV, Two Single Beds).
- **Facilities**: 24/7 Water Supply, 24/7 Hot Water, Power Backup, Lift Facility, 24/7 CCTV Surveillance, Security Watchman.
- **Suitability**: Bachelors, Families, and Couples. Electricity separate; internet arranged by tenant.
