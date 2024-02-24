import { RequestHandler } from 'express';
import Category from '../../database/models/category';
import apiResponse from '../../helper/response';

class CategoryController {
  static getCategories: RequestHandler = async (req, res, next) => {
    try {
      const categories = await Category.findAll({
        include: ['parent', 'children'],
      });

      return apiResponse(res, categories);
    } catch (error) {
      next(error);
    }
  };

  static addCategory: RequestHandler = async (req, res, next) => {
    try {
      const { label, parent_id } = req.body;

      if (!label) {
        throw new Error(`Label already exist`);
      }

      const alreadyExist = await Category.findOne({
        where: {
          label,
          parent_id,
        },
      });

      if (alreadyExist) throw new Error(`Category ${label} already exist`);

      const parentExist = await Category.findOne({
        where: {
          id: parent_id,
        },
      });

      if (!parentExist) throw new Error(`Invalid Parent Category`);

      const category = await Category.create({
        label,
        parent_id,
      });

      return apiResponse(res, category);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  };

  static getCategorySubtree: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id, { include: ['children'] });

      if (!category) throw new Error('Category not found');

      return apiResponse(res, category);
    } catch (error) {
      next(error);
    }
  };

  static changeCategoryParent: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { parent_id } = req.body;

      const category = await Category.findByPk(id);

      if (!category) throw new Error('Category not found');

      const parent = await Category.findByPk(parent_id);

      if (!parent) throw new Error('Parent Category not found');

      await Category.update(
        {
          parent_id,
        },
        {
          where: { id },
        },
      );

      return apiResponse(res, category);
    } catch (error) {
      next(error);
    }
  };

  static removeCategory: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id);

      if (!category) throw new Error('Category not found');

      await category.destroy();

      return apiResponse(res, 'successful');
    } catch (error) {
      next(error);
    }
  };
}

export default CategoryController;
