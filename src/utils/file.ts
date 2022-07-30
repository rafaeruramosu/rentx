import fs from 'fs';

export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename); // 'stat' verifica se um arquivo existe ou nao no diretorio recebido como parametro
  } catch {
    return;
  }

  await fs.promises.unlink(filename); // 'unlink' responsavel por deletar um arquivo
};
