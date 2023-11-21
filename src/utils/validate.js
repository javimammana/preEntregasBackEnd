

function validateProd (req, res, next) {
    const {title, description, price, code, stock, category} = req.body;
    
    if (!title) {
        return res.json ({
            error: "El Nombre del producto es necesario"
        })
    }

    if (!description) {
        return res.json ({
            error: "La Descripcion del producto es necesaria"
        })
    }

    if (!price) {
        return res.json ({
            error: "El precio del producto es necesario"
        })
    }

    if (!code) {
        return res.json ({
            error: "El codigo del producto es necesario"
        })
    }
    if (!stock) {
        return res.json ({
            error: "El stock de productos es necesario"
        })
    }

    if (!category) {
        return res.json ({
            error: "La categoria de producto es necesaria"
        })
    }

    next();
}

export { validateProd };