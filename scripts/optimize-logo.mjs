// Optimiza el logo oficial para web (header/footer/login)
import sharp from 'sharp'

const pub = 'C:/Users/Danie/Documents/premolsa-app/public'

// Logo apaisado a ancho razonable, fondo blanco -> recortar márgenes y comprimir
await sharp('D:/LOGOS/LOGO.PNG')
  .trim({ threshold: 10 })           // recorta el borde blanco
  .resize({ width: 480 })
  .png({ quality: 90, compressionLevel: 9 })
  .toFile(`${pub}/logo-premolsa-opt.png`)

console.log('Logo optimizado -> public/logo-premolsa-opt.png')
