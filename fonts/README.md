# Fonts Directory

Store custom fonts here.

## Supported Formats

- .ttf (TrueType)
- .woff (Web Open Font Format)
- .woff2 (Web Open Font Format 2)
- .otf (OpenType)

## Usage

1. Place font files in this directory
2. Reference in CSS with @font-face
3. Update imports in client/src/index.css

Example:
```css
@font-face {
  font-family: 'CustomFont';
  src: url('fonts/custom-font.ttf') format('truetype');
}
```
