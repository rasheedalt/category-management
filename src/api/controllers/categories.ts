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

      const alreadyExist = await Category.findOne({
        where: {
          label,
          parent_id,
        },
      });

      if (alreadyExist) throw new Error(`Category ${label} already exist`);

      const category = await Category.create({
        label,
        parent_id,
      });

      return apiResponse(res, category);
    } catch (error) {
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

      await category.update({
        parent_id,
      });

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
