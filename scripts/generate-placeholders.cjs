const fs = require('fs')
const path = require('path')

const base = path.join(__dirname, '..', 'public', 'projects', 'demo')

function createSVG(width, height, text, hue = 220, brightness = 15) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g${hue}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:hsl(${hue},10%,${brightness}%)" />
      <stop offset="100%" style="stop-color:hsl(${hue + 20},15%,${Math.max(brightness - 5, 5)}%)" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g${hue})"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="rgba(255,255,255,0.06)" font-family="Helvetica, Arial, sans-serif" font-size="18" letter-spacing="8">${text}</text>
</svg>`
}

// Clean old files
const stillsDir = path.join(base, 'stills')
const portraitsDir = path.join(base, 'portraits')
fs.readdirSync(stillsDir).forEach(f => fs.unlinkSync(path.join(stillsDir, f)))
fs.readdirSync(portraitsDir).forEach(f => fs.unlinkSync(path.join(portraitsDir, f)))

// Hero
fs.writeFileSync(path.join(base, 'stills', 'hero.svg'), createSVG(2400, 1000, 'HERO', 200, 12))

// Stills 01-10
for (let i = 1; i <= 10; i++) {
  const num = String(i).padStart(2, '0')
  const hue = 200 + (i * 15)
  fs.writeFileSync(
    path.join(base, 'stills', `${num}.svg`),
    createSVG(2400, 1500, `STILL ${num}`, hue, 8 + i * 2)
  )
}

// Director portrait
fs.writeFileSync(
  path.join(base, 'portraits', 'director.svg'),
  createSVG(800, 1067, 'PORTRAIT', 240, 18)
)

console.log('SVG placeholders generated.')
