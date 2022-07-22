import { parse as csvParse } from 'csv-parse';
import fs from 'fs';

class ImportCategoryUserCase {
  execute(file: Express.Multer.File): void {
    const stream = fs.createReadStream(file.path);

    const parseFile = csvParse();

    stream.pipe(parseFile); // 'pipe' pega o que está sendo lido do stream e joga para algum lugar determinado como parâmetro dele

    parseFile.on('data', async line => {
      console.log(line);
    });
  }
}

export { ImportCategoryUserCase };
