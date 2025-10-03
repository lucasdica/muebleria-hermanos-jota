import fs from 'fs/promises'

export async function leerInventario() {
    
    try{
        const data = await fs.readFile('data/catalogo.json');
        const dataJson = JSON.parse(data);

        return dataJson;
    }catch(error) {
        console.error(error);
        return null;
    }
}