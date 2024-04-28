const router = require("express").Router();
const { faker } = require("@faker-js/faker");

const Products = require("../model/product.model");

router.get("/products", async(req,res) => {
    const products = await Products.findAll();
    res.status(201).json({
        ok: true,
        status: 201,
        message: products
    });
});

router.get("/products/:product_id", async(req,res) => {
    const id = req.params.product_id;
    const products = await Products.findOne({
        where: {id: id}
    });
    res.status(201).json({
        ok: true,
        status: 201,
        message: products
    });
});

router.post("/products", async(req,res) => {
    const dataProducts = req.body;
    await Products.sync();
    const createProduct = await Products.create({
        //cauto completa la tabla con estas lineas
        /*  product_name: faker.commerce.product(),
        price: faker.commerce.price(),
        is_stock: faker.datatype.boolean() */
        product_name: dataProducts.product_name,
        price: dataProducts.price,
        is_stock: dataProducts.is_stock
    });
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Created Product",
    });
});

router.put("/products/:product_id", async(req,res) => {
    const dataProducts = req.body;
    const id = req.params.product_id;
    const updateProduct = await Products.update({
        product_name: dataProducts.product_name,
        price: dataProducts.price,
        is_stock: dataProducts.is_stock
    },
    {
        where: {id:id}
    });
    res.status(201).json({
        ok: true,
        status: 201,
        body: updateProduct
    });
});

router.delete("/products/:product_id", async(req,res) => {
    const id = req.params.product_id;
    const products = await Products.destroy({
        where: {id: id}
    });
    res.status(204).json({
        ok: true,
        status: 201,
        body: products
    });
});



module.exports = router;