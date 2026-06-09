// Optimiza el logo oficial VERDE para web (header/footer/login)
import sharp from 'sharp'

const pub = 'C:/Users/Danie/Documents/premolsa-app/public'

await sharp('D:/LOGOS/LOGO VERDE.png')
  .trim({ threshold: 10 })           // recorta el borde blanco
  .resize({ width: 480 })
  .png({ quality: 90, compressionLevel: 9 })
  .toFile(`${pub}/logo-premolsa-opt.png`)

console.log('Logo VERDE optimizado -> public/logo-premolsa-opt.png')
