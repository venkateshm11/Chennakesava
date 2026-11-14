import os

def create_svg(path, width, height, title, subtitle, tag):
    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F7F5EF" />
      <stop offset="100%" stop-color="#EFEBE2" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DEDAD0" stroke-width="0.75" stroke-opacity="0.6"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)" />
  <rect width="100%" height="100%" fill="url(#grid)" />
  <rect x="24" y="24" width="{width-48}" height="{height-48}" fill="none" stroke="#DEDAD0" stroke-width="1.5" stroke-dasharray="6 6" rx="8" />
  
  <!-- Architectural Camera / Focal Motif -->
  <g transform="translate({width/2}, {height/2 - 40})">
    <circle cx="0" cy="0" r="32" fill="#FFFFFF" stroke="#B89B68" stroke-width="1.5" />
    <path d="M -14 0 L 14 0 M 0 -14 L 0 14" stroke="#B89B68" stroke-width="1.5" stroke-linecap="round"/>
    <rect x="-22" y="-16" width="44" height="32" rx="4" fill="none" stroke="#B89B68" stroke-width="1.2" stroke-opacity="0.7"/>
    <circle cx="0" cy="0" r="7" fill="none" stroke="#B89B68" stroke-width="1.2"/>
  </g>

  <!-- Tag Pill -->
  <rect x="{width/2 - 75}" y="{height/2 + 10}" width="150" height="26" rx="13" fill="#292A27" />
  <text x="{width/2}" y="{height/2 + 27}" font-family="'Inter', -apple-system, sans-serif" font-size="10.5" font-weight="600" fill="#F7F5EF" letter-spacing="1.5" text-anchor="middle">{tag.upper()}</text>

  <!-- Title & Subtitle -->
  <text x="{width/2}" y="{height/2 + 65}" font-family="'Playfair Display', Georgia, serif" font-size="22" font-weight="600" fill="#292A27" text-anchor="middle">{title}</text>
  <text x="{width/2}" y="{height/2 + 92}" font-family="'Inter', -apple-system, sans-serif" font-size="12" fill="#77766F" text-anchor="middle">{subtitle}</text>
  <text x="{width/2}" y="{height/2 + 115}" font-family="'Inter', -apple-system, sans-serif" font-size="11" fill="#B89B68" text-anchor="middle">Ready for real property photograph</text>
</svg>"""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(svg_content)

placeholders = [
    ('images/hero/hero-placeholder.svg', 1600, 1000, 'Chennakeshava Nilaya', 'Architectural Exterior Photograph Placeholder (1600x1000)', 'Hero Image'),
    ('images/intro/intro-building.svg', 1000, 800, 'Green Glen Layout, Bellandur', 'Property View Placeholder', 'Property Overview'),
    ('images/1bhk/1bhk-main.svg', 1000, 750, '1 BHK Residential Unit', 'Living and Balcony View Placeholder (1000x750)', '1 BHK Model'),
    ('images/1bhk/1bhk-interior.svg', 1000, 750, '1 BHK Furnished Interior', 'Bedroom and Hall Space Placeholder', '1 BHK Interior'),
    ('images/1rk/1rk-main.svg', 1000, 750, '1 RK Residential Unit', 'Studio Living Space Placeholder (1000x750)', '1 RK Model'),
    ('images/1rk/1rk-interior.svg', 1000, 750, '1 RK Furnished Room', 'Beds and Kitchenette Space Placeholder', '1 RK Interior'),
    ('images/gallery/gallery-exterior-1.svg', 900, 650, 'Building Façade', 'Front Elevation & Entrance Placeholder', 'Exterior'),
    ('images/gallery/gallery-exterior-2.svg', 900, 1100, 'Architectural Elevation', 'Side Perspective & Structure Placeholder', 'Exterior'),
    ('images/gallery/gallery-living-1.svg', 900, 650, '1 BHK Living Area', 'Furnished Living Room & Sofa Placeholder', 'Living Space'),
    ('images/gallery/gallery-bedroom-1.svg', 900, 650, '1 BHK Master Bedroom', 'Comfortable Bed & Wardrobe Placeholder', 'Bedrooms'),
    ('images/gallery/gallery-bedroom-2.svg', 900, 1100, '1 RK Room Layout', 'Twin Beds Setup Placeholder', 'Bedrooms'),
    ('images/gallery/gallery-kitchen-1.svg', 900, 650, 'Kitchen Space', 'Countertop, Sink & Storage Placeholder', 'Kitchen'),
    ('images/gallery/gallery-bathroom-1.svg', 900, 650, 'Bathroom & Geyser', 'Modern Tiled Bathroom Placeholder', 'Bathrooms'),
    ('images/gallery/gallery-common-1.svg', 900, 650, 'Lift & Lobby Corridor', 'Well-lit Common Area Placeholder', 'Common Areas')
]

for p, w, h, t, s, tag in placeholders:
    create_svg(p, w, h, t, s, tag)

favicon_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#292A27" />
  <rect x="3" y="3" width="58" height="58" rx="11" fill="none" stroke="#B89B68" stroke-width="1.5" stroke-opacity="0.8" />
  <text x="32" y="42" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="700" fill="#F7F5EF" text-anchor="middle">C</text>
  <circle cx="32" cy="18" r="2.5" fill="#B89B68" />
</svg>"""

with open('favicon/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(favicon_svg)

print('All SVG placeholders and favicon generated successfully.')

