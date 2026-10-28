const fs = require('fs');
const path = require('path');

const sampleDir = path.join(__dirname, '../../public/assets/artworks/artwork_samples');

function getCategory(folder) {
  switch (folder) {
    case 'banner': return 'Banner';
    case 'Book cover': return 'Book Cover';
    case 'Character_art': return 'Character Art';
    case 'comic': return 'Comic';
    case 'emotes': return 'Emotes';
    case 'manga': return 'Manga';
    case 'mascot logo': return 'Mascot Logo';
    default: return folder;
  }
}

function getAspectRatio(w, h) {
  const ratio = w / h;
  if (ratio >= 1.5) return '16/9';
  if (ratio <= 0.72) return '4/5';
  if (ratio <= 0.85) return '3/4';
  return '1/1';
}

// Basic image dimension extractor without external packages
function getImageDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  // PNG
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  // JPEG
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) break;
    const marker = buffer[offset + 1];
    if (marker === 0xc0 || marker === 0xc2) {
      return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5) };
    }
    const len = buffer.readUInt16BE(offset + 2);
    offset += 2 + len;
  }
  return { width: 1000, height: 1000 };
}

const folders = fs.readdirSync(sampleDir);
const allArtworks = [];
let index = 1;

for (const folder of folders) {
  const folderPath = path.join(sampleDir, folder);
  if (!fs.statSync(folderPath).isDirectory()) continue;

  const files = fs.readdirSync(folderPath).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  files.sort();

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const dims = getImageDimensions(filePath);
    const category = getCategory(folder);
    const aspect = getAspectRatio(dims.width, dims.height);
    const url = `/assets/artworks/artwork_samples/${folder}/${file}`;

    const baseName = path.parse(file).name;
    const cleanName = baseName.replace(/[^\w\s-]/g, '').trim();
    const id = `${category.toLowerCase().replace(/\s+/g, '-')}-${String(index).padStart(2, '0')}`;

    let title = `${category.toUpperCase()} // ${cleanName || '#' + index}`;
    if (title.length > 35 || !cleanName) {
      title = `${category.toUpperCase()} // ISSUE #${index}`;
    }

    const tags = [category, 'Cel Shaded', '2D Art'];
    if (category === 'Banner') tags.push('Wide Banner', 'Keyframe');
    else if (category === 'Book Cover') tags.push('Graphic Novel', 'Print Ready');
    else if (category === 'Character Art') tags.push('Concept Art', 'Lineart');
    else if (category === 'Comic') tags.push('Sequential', 'Action Panel');
    else if (category === 'Emotes') tags.push('Sticker', 'Twitch Emote');
    else if (category === 'Manga') tags.push('Screentones', 'Manga Page');
    else if (category === 'Mascot Logo') tags.push('Logo Emblem', 'Vector Style');

    allArtworks.push({
      id,
      title,
      category,
      description: `Original ${category.toLowerCase()} production asset crafted with precision ink linework, stepped cel-shaded tonal separation, and rich comic aesthetic palette.`,
      date: `2026-${String((index % 6) + 4).padStart(2, '0')}`,
      tags,
      thumbnailUrl: url,
      fullUrl: url,
      aspectRatio: aspect,
      featured: [1, 4, 12, 35, 45, 60].includes(index)
    });

    index++;
  }
}

const currentData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/artworks.json'), 'utf8'));

currentData.profile.name = 'EMILIA // 2D CEL ARTIST';
currentData.profile.handle = '@emilia_cel';
currentData.profile.avatarUrl = '/assets/artworks/artwork_samples/Character_art/11.jpg';
currentData.profile.heroCharacterImage = '/assets/artworks/artwork_samples/Character_art/24.jpg';
currentData.profile.discordTag = 'emilia_art#0001';
currentData.profile.email = 'commissions@emilia-art.com';
currentData.profile.socials = currentData.profile.socials.map(s => {
  if (s.platform === 'twitter') return { ...s, url: 'https://twitter.com/emilia_cel' };
  if (s.platform === 'instagram') return { ...s, url: 'https://instagram.com/emilia_cel' };
  if (s.platform === 'artstation') return { ...s, url: 'https://artstation.com/emilia_cel' };
  if (s.platform === 'discord') return { ...s, url: 'https://discord.gg/emilia-art' };
  if (s.platform === 'email') return { ...s, url: 'mailto:commissions@emilia-art.com?subject=Commission%20Inquiry%20-%20Emilia%20Portfolio' };
  return s;
});

currentData.artworks = allArtworks;

fs.writeFileSync(path.join(__dirname, '../data/artworks.json'), JSON.stringify(currentData, null, 2), 'utf8');
console.log(`Successfully synced ${allArtworks.length} artworks into src/data/artworks.json!`);
