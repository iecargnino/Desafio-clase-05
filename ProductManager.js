const fs = require('fs')
let productos = []

class ProductManager{
    constructor(path) {
        //this.products = []
        this.path = path
    }

    idGenerator = () => {
        const count = productos.length
        if ( count === 0 ) {
            return 1
        } else {
            return (productos[count-1].id) + 1
        }
    }

    getProducts = async() => {
        if (fs.existsSync(this.path)) {                                      
            const contenido = await fs.promises.readFile(this.path, 'utf-8')            
            console.log(JSON.parse(contenido))                     
        } else {
            console.log('El archivo no existe')
        }
        return productos
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        const id = this.idGenerator()
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Faltan campos para agregar el nuevo producto!");
            return;
        }
        if ( productos.find(elem => elem.code === code)) {
            console.error(`¡El producto con codigo: ${code} ya existe en el inventario!`);
            return;
        }
        productos.push({
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        })
        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2))
    }

    getElementById = async (a) => {
        const obj = await fs.promises.readFile(this.path, 'utf-8')
        const array = JSON.parse(obj);
        const object = array.find(e => e.id === a)
        if ( object ) {
            console.log(object)
        } else (
            console.error(`Objeto en el Array con id: ${a} no encontrado`)
        )
    }

    deleteElementById = async(a) => {
        const obj = await fs.promises.readFile(this.path, 'utf-8')
        const array = JSON.parse(obj);
        productos = array.filter(e => e.id !== a)
        if ( productos ) {
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2))
        } else (
            console.error(`Objeto en el Array con id: ${a} no encontrado`)
        )
    }
        
    updateProductById = async(a, prop, contenido) => {
        const obj = await fs.promises.readFile(this.path, 'utf-8')
        const array = JSON.parse(obj);
        const object = array.find(e => e.id === a)
        this.prop = prop    
        object.this.prop = contenido       
        console.log(object)
    } 

}

async function desafio() {
    const admin = new ProductManager('products.json')
    await admin.addProduct('Camara','Nikon',300,'./img/nikon.jpg','0a0a20',3)
    await admin.addProduct('Televisor','LG',200,'./img/tvLG.jpg','0a0AA88',3)
    await admin.addProduct('Celular','Xaomi',150,'./img/tvLG.jpg','0a0AA',3)
    //await admin.getProducts()
    //await admin.getElementById(1)
    //await admin.deleteElementById(2)
    //await admin.updateProductById(3, 'title', 'Samsung')
}

desafio()