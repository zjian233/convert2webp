import { readdir, mkdir } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const INPUT_DIR = './input';
const OUT_DIR = './out';

async function getFileList(dir:string):Promise<string[]> {
  try {
    const fileList = await readdir(dir);
    return fileList;
  } catch(err) {
    await mkdir(dir)
    return [];
  }
}

async function initOutDir():Promise<void> {
  try {
    await readdir(OUT_DIR);
  } catch(err) {
    await mkdir(OUT_DIR)
  }
}

async function main() {
  const fileList = await getFileList(INPUT_DIR);
  await initOutDir();

  for (let fileName of fileList) {
    const filePath = path.join(INPUT_DIR, fileName);
    const webPName = path.basename(fileName, '.jpg') + '.webp';
    const outPath = path.join(OUT_DIR, webPName);
    sharp(filePath).toFile(outPath, function(err) {
      if (err) {
        console.log('transform err:', err);
      }
      console.log(`Transform ${fileName} finished`);
    })
  }
}

main();

