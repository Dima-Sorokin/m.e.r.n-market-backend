const express = require(`express`);
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProductsById,
    deleteProduct,
    updateProduct
} = require(`../controllers/productControllers`)




//GET all
router.get(`/`, getAllProducts);

//GET single one
router.get(`/:id`, getProductsById);

//POST
router.post(`/`, createProduct)

//DELETE
router.delete(`/:id`, deleteProduct)

//UPDATE
router.patch(`/:id`, updateProduct)

module.exports = router;