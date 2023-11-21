import fs from "fs"
import { ProductManager } from "../manager/ProductManager.js";


const prodManager = new ProductManager("./src/data/productos.json");

class CartManager {
    constructor(path) {
        this.path = path;
        try {
            let carts = fs.readFileSync(this.path, "utf-8");
            this.carts = JSON.parse(carts);
        } catch {
            this.carts = [];
        }
    }

    src = id => this.carts.find(cart => cart.id === id);

    async saveCart (productosCart) {
        try {
            await fs.promises.writeFile (
                this.path,
                JSON.stringify(productosCart, null, "\t")
            )
            console.log ("Se actualiza BASE carrito");
        } catch (error) {
                console.log (`Hubo un error al actualizar BASE carrito. Error: ${error}`);
        }
    }

    async addCart () {
        const newCart = {
            id: this.carts.length + 1,
            products: []
        }
        this.carts.push(newCart);

        const respuesta = await this.saveCart (this.carts);
        return !respuesta
        ? console.log ("carrito creado")
        : console.log ("Error al crear carrito");
    }

    getCartById(id) {
        const cart = this.src(id);
        if (cart) {
            // console.log (cart.products);
            return cart.products;
        }
        return "Not found - El carrito no existe";
    }


    async addProductInCart (cid, pid) {
        console.log(cid)
        console.log(pid)
        const carrito = this.src(cid);

        if (carrito) {
            console.log("carrito existe");
            
            const producto = prodManager.src(pid);
            console.log (producto);

            if (producto) {
                console.log ("Producto existe");

                const existe = carrito.products.find((prod) => prod.product === pid);
            
                console.log(existe);

                if (!existe) {

                    const addItem = new ItemCart (pid, 1);
                    carrito.products.push(addItem);
                    console.log ("Se agrega producto a Carrito");

                    const respuesta = await this.saveCart (this.carts);
                    return !respuesta
                    ? console.log ("Carrito actualizado")
                    : console.log ("Error al actualizar carrito");
                } console.log ("producto ya existe en carrito")

                const addItem = {
                    ...existe, 
                    quantity: (existe.quantity+1)}

                    console.log (addItem);

                    carrito.products.splice(carrito.products.indexOf(existe),1,addItem);
                    console.log("Se agrega item al producto en carrito")

                    console.log(carrito.products);

                    const respuesta = await this.saveCart (this.carts);
                    return !respuesta
                    ? console.log ("Carrito actualizado")
                    : console.log ("Error al actualizar carrito");

            } console.log ("Producto no existe");
            
            return ;
        } console.log("Carrito no existe");
        return ;

    }


}

class ItemCart {
    constructor (product, quantity) {
        this.product  = product;
        this.quantity = quantity;
    }
}

export { CartManager, ItemCart };