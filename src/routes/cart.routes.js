import { CartManager } from "../manager/CartManager.js";
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

    try { const addProdCart = await manager.addProductInCart (Number(cid), Number(pid));

        if (addProdCart?.error) {return res.status(409).json({error: addProdCart.error})}
        res.json ({
            message: "Producto Agregado a Carrito"
        })
    } catch (e) {
        res.status(500).json ({
            error: e.message,
        })
    }
})

router.delete ("/:cid", async(req, res) => {
    const  { cid } = req.params;

        try { const deleteCart = await manager.deleteCart(Number(cid));

            if (deleteCart?.error) {return res.status(409).json({error: deleteCart.error})}
        res.json ({
            message: "Carrito eliminado"
        })
    } catch (e) {
        res.status(500).json ({
            error: e.message,
        })
    }
})

router.delete ("/:cid/product/:pid",async (req, res) => {
    const { cid, pid } = req.params;

    try { const deleteItem = await manager.deleteItem(Number(cid), Number(pid));
        if (deleteItem?.error) {return res.status(409).json({error: deleteItem.error})}

        res.json ({
            message: "Carrito eliminado"
        })
    } catch (e) {
        res.status(500).json ({
            error: e.message,
        })
    }
})

export default router;