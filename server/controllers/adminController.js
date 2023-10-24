const { checkPwd } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');
const { User, Item, Category, sequelize, Ingredient } = require('../models');

class AdminController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw new Error('email_required');
      }

      if (!password) {
        throw new Error('password_required');
      }

      const checkUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!checkUser) {
        throw new Error('user_not_found_login');
      }

      if (!checkPwd(password, checkUser.password)) {
        throw new Error('password_invalid');
      }

      const payload = {
        id: checkUser.id,
        email: checkUser.email,
        role: checkUser.role,
      };

      const token = createToken(payload);

      res.status(200).json({
        statusCode: 200,
        message: `User ${checkUser.email} Logged in successfully`,
        access_token: token,
        user: payload,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addItem(req, res, next) {
    const trx = await sequelize.transaction();
    try {
      const { id } = req.user;
      const { name, description, price, imgUrl, categoryId, ingredients } =
        req.body;

      const newItem = await Item.create(
        {
          name,
          description,
          price,
          imgUrl,
          categoryId,
          authorId: id,
        },
        { transaction: trx }
      );

      const ingredientsData = ingredients.map((ingredient) => ({
        ...ingredient,
        itemId: newItem.id,
      }));
      const newIngredients = await Ingredient.bulkCreate(ingredientsData, {
        transaction: trx,
      });

      await trx.commit();

      res.status(201).json({
        statusCode: 201,
        message: 'Item and ingredients added successfully',
        item: newItem,
        ingredients: newIngredients,
      });
    } catch (error) {
      await trx.rollback();

      next(error);
    }
  }
  static async showItems(req, res, next) {
    try {
      const getItems = await Item.findAll({
        include: [
          {
            model: Category,
          },
          {
            model: User,
            attributes: {
              exclude: [
                'createdAt',
                'updatedAt',
                'password',
                'address',
                'phoneNumber',
              ],
            },
          },
        ],
        order: [['createdAt', 'DESC']],
      });

      if (getItems.length === 0) {
        throw new Error('item_not_found');
      }

      res.status(200).json({
        statusCode: 200,
        message: `Get all item successfully`,
        data: getItems,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editItem(req, res, next) {
    const trx = await sequelize.transaction();
    try {
      const itemId = req.params.id;
      const { name, description, price, imgUrl, categoryId, ingredients } =
        req.body;

      const existingItem = await Item.findByPk(itemId, { transaction: trx });
      if (!existingItem) throw new Error('item_not_found');

      await existingItem.update(
        {
          name,
          description,
          price,
          imgUrl,
          categoryId,
        },
        { transaction: trx }
      );

      await Ingredient.destroy({ where: { itemId: itemId }, transaction: trx });

      const ingredientsData = ingredients.map((ingredient) => ({
        ...ingredient,
        itemId: itemId,
      }));

      const updatedIngredients = await Ingredient.bulkCreate(ingredientsData, {
        transaction: trx,
      });

      await trx.commit();

      res.status(200).json({
        statusCode: 200,
        message: 'Item and ingredients updated successfully',
        item: existingItem,
        ingredients: updatedIngredients,
      });
    } catch (error) {
      await trx.rollback();

      next(error);
    }
  }

  static async deleteItem(req, res, next) {
    try {
      const { id } = req.params;

      const deletedItem = await Item.findByPk(id);

      if (!deletedItem) {
        throw new Error('item_not_found');
      }

      await Item.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: `Success delete ${deletedItem.name} !!`,
        data: deletedItem,
      });
    } catch (error) {
      next(error);
    }
  }

  static async detailItem(req, res, next) {
    try {
      const { id } = req.params;

      const getDetail = await Item.findOne({
        where: {
          id,
        },
      });

      if (!getDetail) {
        throw new Error('item_not_found');
      }

      res.status(200).json({
        statusCode: 200,
        message: `Get ${getDetail.name} detail successfully`,
        data: getDetail,
      });
    } catch (error) {
      next(error);
    }
  }

  static async showCategories(req, res, next) {
    try {
      const getCategories = await Category.findAll({});

      if (getCategories.length === 0) {
        throw new Error('category_not_found');
      }

      res.status(200).json({
        statusCode: 200,
        message: `Get all category successfully`,
        data: getCategories,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addCategory(req, res, next) {
    try {
      const { name } = req.body;

      const addCategory = await Category.create({
        name,
      });

      res.status(201).json({
        statusCode: 201,
        message: `Success add category ${addCategory.name}`,
        data: addCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      console.log('Fetching category by ID:', id);

      const deletedCategory = await Category.findByPk(id);
      console.log('Found category:', deletedCategory);

      if (!deletedCategory) {
        throw new Error('category_not_found');
      }

      await Category.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: `Delete ${deletedCategory.name} successfully`,
        data: deletedCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  static async registerAdmin(req, res, next) {
    try {
      const { email, password, phoneNumber, address } = req.body;

      const createAdmin = await User.create({
        email,
        password,
        role: 'admin',
        phoneNumber,
        address,
      });

      res.status(201).json({
        statusCode: 201,
        message: `Success register ${createAdmin.email}`,
        data: createAdmin,
      });
    } catch (error) {
      next(error);
    }
  }

  static async showIngredients(req, res, next) {
    try {
      const { id } = req.params;

      const getIngredients = await Ingredient.findAll(
        {
          where: {
            itemId: id,
          },
        },
        { include: Item }
      );

      if (getIngredients.length === 0) {
        throw new Error('ingredients_not_found');
      }

      res.status(200).json({
        statusCode: 200,
        message: `Success get all ingredients`,
        data: getIngredients,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdminController;
