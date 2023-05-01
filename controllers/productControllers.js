const ProductModel = require(`../models/productModel`);
const mongoose = require(`mongoose`);
const productModel = require("../models/productModel");

const getAllProducts = async (req, res) => {
    const products = await ProductModel.find({}).sort({ createdAt: -1 })
    //the "{ createdAt:-1 }" sorting the output by creating date, starting from the latest.
    res.status(200).json(products);
}

const getProductsById = async (req, res) => {
    const { id } = req.params;
    //to check if the id (uniqe auto generated id) exist.
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(404).json({ error: `ID is not found.` })
    // }
    //to find by auto generated uid:
    // const products = await ProductModel.findById(id);
    const products = await ProductModel.find({ id: id });
    if (products.length < 1) {
        //in case that there is no product we send status not found (404).
        return res.status(404).json({ error: `Product not found.` })
    }
    res.status(200).json(products);
}

const createProduct = async (req, res) => {
    const { id, name, price, quantity, description } = req.body;

    //check if any of the fields is empty
    let errorFields = [];
    if (!id) { errorFields.push('Id') };
    if (!name) { errorFields.push('Name') };
    if (!price) { errorFields.push('Price') };
    if (!quantity) { errorFields.push('Quantity') };
    if (!description) { errorFields.push('Description') };
    if (errorFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', errorFields })
    }

    //check if the id already exists
    const existingProduct = await ProductModel.find({ id: id });
    if (existingProduct.length > 0) {
        console.log(`existingProduct => ${existingProduct}`);
        errorFields.push('Id');
        return res.status(400).json({ error: 'Product with this ID already exists,\n try updaiting the product or create a new ID', errorFields })
    }

    //creating new product if it fits the schema in productModel
    try {
        const product = await ProductModel.create({ id, name, description, quantity, price });
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `Object id was NOT valid.` })
    }
    const deletedProduct = await productModel.findOneAndDelete({ _id: id });
    if (!deletedProduct) {
        return res.status(404).json({ error: `Product id was NOT found.` })
    }
    res.status(200).json(deletedProduct);
}

const updateProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `Product was NOT found.` })
    }
    try {
        const productUpdateing = await ProductModel.findOneAndUpdate({ id: id }, { ...req.body })
        res.status(200).json(productUpdateing);
    } catch {
        res.status(400).json({ error: 'update invalid' })
    }
}


module.exports = {
    createProduct,
    getAllProducts,
    getProductsById,
    deleteProduct,
    updateProduct
}