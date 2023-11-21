import { CartManager, ItemCart } from "../manager/CartManager.js";
// import { ProductManager } from "../manager/ProductManager.js";
import { Router } from "express";

const router = Router();
const manager = new CartManager ("./src/data/carrito.json");


router.post ("/", async (req, res) => {
    try {
        await manager.addCart();
        res.json ({
            message: "Carrito creado"
        })
    } catch (e) {
        res.json ({
            error: e.message,
        })
    }
})

router.get ("/:cid", (req, res) => {
    console.log (req.params);
    const { cid } = req.params;
    const prodInCart = manager.getCartById(Number(cid));

    res.json (prodInCart);
})

router.post ("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;

    try {
        await manager.addProductInCart (Number(cid), Number(pid));
        res.json ({
            message: "Producto Agregado a Carrito"
        })
    } catch (e) {
        res.json ({
            error: "Error al agregar producto al cerrito",
        })
    }
})




export default router;