// const fs = require("fs");
import fs from "fs"
class ProductManager {
    constructor(path) {
        this.path = path;
        try {
            let productos = fs.readFileSync(this.path, "utf-8");
            this.productos = JSON.parse(productos);
        } catch {
            this.productos = [];
        }
    }
    
    src = id => this.productos.find(prod => prod.id === id);

    async saveProduct (productos) {
        try {
            await fs.promises.writeFile (
                this.path,
                JSON.stringify(productos, null, "\t")
            )
            console.log ("Se escribe BASE");
        } catch (error) {
                console.log (`Hubo un error al escribir BASE. Error: ${error}`);
        }
    }

    validate(elemento) {
        const {title, description, price, thumbnail, code, stock, category} = elemento;
        return (!title || !description || !price || !thumbnail || !code || !stock || !category) ? false : true;
    }

    async addProduct(elemento) {

        if (elemento) {
            const product = this.productos.some(prod => prod.code === elemento.code);
            
            if (!product) {
                const newProduct = await {
                        ...elemento,
                        id: this.productos.length + 1
                    }
                    this.productos.push(newProduct);
                    console.log("Producto creado");

                    const respuesta = await this.saveProduct(this.productos);
                    return !respuesta 
                    ? console.log ("Producto agregado a la base") 
                    : console.log("Hubo un error agregar el producto a la base");
                } 
                console.log ("Producto existente");
                //throw Error("El codigo ya existe");
                return;
        }
        console.log ("Datos incompletos");
        return;
    }

    getProducts = () => {
        //console.log(this.productos);
        return this.productos;
    }

    async getProductById(id) {
        const product = await this.src(id);
        if (product) {
            //console.log (product);
            return product;
        }
        return "Not found - El producto no existe";
    }

    async deleteProduct(id) {

        const product = this.src(id);

        if (product) {
            await this.productos.splice(this.productos.indexOf(product), 1);
            console.log ("Se elimina producto");

            const respuesta = await this.saveProduct(this.productos);
            return !respuesta
            ? console.log ("Producto borrado de la Base")
            : console.log("Hubo un error al borrar el producto de la base");
        }
        console.log (`El producto id:${id} no existe para ser eliminado`);
    }

    async updateProduct (id, elemento) {

        const product = this.src(id);

        if (product) {

            const productCode = this.productos.some(prod => prod.code === elemento.code);
                
            if (!productCode) {
                
                const validacion = this.validate(elemento);

                if (validacion) {
                    const newProduct = {
                        ...elemento,
                        id: id
                    }

                    this.productos.splice(this.productos.indexOf(product), 1, newProduct);
                    console.log ("Producto modificado");

                    const respuesta = await this.saveProduct(this.productos);
                    return !respuesta
                    ? console.log ("Producto modificado en la Base")
                    : console.log("Hubo un error al modificar el producto en la base");
                }
                console.log ("Datos incompleto");
                return;
            }
            console.log ("ID de producto existente");
            return;
        }
        console.log (`El producto id:${id} no existe para ser modificado`);
        return res.json ({
            error: "El producto no existe"
        })
    }
}

class Product {
    constructor (title, description, price, code, stock, category) {
        this.title  = title;
        this.description = description;
        this.price = price;
        this.thumbnail = [];
        this.code = code;
        this.stock = stock;
        this.status = true;
        this.category = category;
    }
}

export { ProductManager, Product };