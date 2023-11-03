import fs from "fs";
import productSchema from '../models/productSchema.js'
import CategorySchema from '../models/CategorySchema.js'

export const createproductcontroller = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "Photo is Required and should be less then 1mb" });
        }
        const products = new productSchema({ ...req.fields })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Something went wrong"
        })
    }
}

export const updateproductcontroller = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "Photo is Required and should be less then 1mb" });
        }
        const products = await productSchema.findByIdAndUpdate(req.params.id, { ...req.fields }, { new: true })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Something went wrong"
        })
    }
}

export const getproductcontroller = async (req, res) => {
    try {
        const products = await productSchema
            .find({})
            .populate("category")
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            counTotal: products.length,
            message: "All Products ",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in getting products",
            error: error.message,
        });
    }
};

export const getspecificproductcontroller = async (req, res) => {
    try {
        const products = await productSchema
            .findById(req.params.id)
            .populate("category")
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            counTotal: products.length,
            message: "Single Products ",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in getting products",
            error: error.message,
        });
    }
};

export const getproductphotocontroller = async (req, res) => {
    try {
        const product = await productSchema.findById(req.params.id).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr while getting photo",
            error,
        });
    }
};

export const deleteproductcontroller = async (req, res) => {
    try {
        const products = await productSchema
            .findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            message: "Product Deleted ",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in deleting products",
            error: error.message,
        });
    }
};

// filters
export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productSchema.find(args);
        res.status(200).send({
            success: true,
            products,
        });
        //   console.log(products)
        //   console.log(args)
        console.log(checked)
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Filtering Products",
            error,
        });
    }
};

// product count
export const productCountController = async (req, res) => {
    try {
        const total = await productSchema.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error in product count",
            error,
            success: false,
        });
    }
};

// product list base on page
export const productListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productSchema
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in per page ctrl",
            error,
        });
    }
};

export const searchproductcontroller = async (req, res) => {
    try {
        const { keyword } = req.params
        const result = await productSchema.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        })
            .select("-photo");
        res.json(result);
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in search",
            error
        })
    }
}

export const productcategorycontroller = async (req, res) => {
    try {
        const category = await CategorySchema.findOne({ _id: req.params._id });
        const products = await productSchema.find({ category }).populate("category");
        res.status(200).send({
          success: true,
          category,
          products,
        });
      } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          error,
          message: "Error While Getting products",
        });
      }
}

