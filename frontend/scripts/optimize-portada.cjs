const sharp = require('sharp');
const path = require('path');

const src = path.join(__dirname, '..', 'public', 'portada.png');
const dst = path.join(__dirname, '..', 'public', 'portada.jpg');

sharp(src)
  .resize({ width: 2560, withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(dst)
  .then((info) => console.log(`OK portada.jpg ${info.width}x${info.height} - ${(info.size / 1024).toFixed(0)} KB`))
  .catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
