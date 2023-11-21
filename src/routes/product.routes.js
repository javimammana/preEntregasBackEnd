import { Router } from "express";
import { ProductManager, Product } from "../manager/ProductManager.js";
import { validateProd } from "../utils/validate.js";

const router = Router();
const manager = new ProductManager("./src/data/productos.json");


router.get("/", async (req,res) => {

    const productos = manager.getProducts();

    const limit = await Number(req.query.limit);
    console.log(limit);

    if (limit) {
        const productosFiltrados = productos.slice(0,limit);
        res.send (productosFiltrados);
        return;
    } 
    res.json (productos);
})

router.get ("/:pid", async (req, res) => {
    console.log (req.params);
    const { pid } = req.params;

    const producto = await manager.getProductById(Number(pid));

    res.send (producto);
})

router.post ("/", validateProd, async (req, res) => {
    const {title, description, price, code, stock, category} = req.body;
    const producto = new Product (title, description, price, code, stock, category);
    console.log (producto);

    try {
        await manager.addProduct(producto);
        res.json ({
            message: "Producto Creado",
            producto,
        });
    } catch (e) {
        res.json ({
            error: e.massage,
        });
    }
});

router.put ("/:pid", validateProd, async (req,res) => {
    console.log (req.params);
    const { pid } = req.params;
    
    const {title, description, price, code, stock, category} = req.body;
    const producto = new Product (title, description, price, code, stock, category);

    try {
        await manager.updateProduct(Number(pid), producto);
        res.json ({
            message: "Producto Actualizado",
            producto,
        });
    } catch (e) {
        res.json ({
            error: "Error al actualizar Producto",
        });
    }

    
})

router.delete ("/:pid", (req, res) => {
    console.log (req.params);
    const { pid } = req.params;
    manager.deleteProduct(Number(pid));
})




export default router;