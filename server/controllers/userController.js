const { Item, Category, User } = require('../models');

class UserController {
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

  static async itemDetail(req, res, next) {
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
}

module.exports = UserController;
