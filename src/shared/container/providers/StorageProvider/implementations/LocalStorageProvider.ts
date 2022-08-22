import fs from 'fs';
import { resolve } from 'path';

import upload from '@config/upload';

import { IStorageProvider } from '../IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    // 'rename' remove o arquivo da pasta informada como primeiro parametro e adiciona para a pasta informada no segundo parametro
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file),
    );

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(filename); // 'stat' verifica se um arquivo existe ou nao no diretorio recebido como parametro
    } catch {
      return;
    }

    await fs.promises.unlink(filename); // 'unlink' responsavel por deletar um arquivo
  }
}

export { LocalStorageProvider };
