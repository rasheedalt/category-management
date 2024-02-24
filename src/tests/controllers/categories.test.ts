import { describe, expect, it, beforeEach, jest, afterAll } from '@jest/globals';
import CategoryController from '../../api/controllers/categories';
import Category from '../../database/models/category';
import { Request, Response } from 'express';

jest.mock('../../database/models/category');
const demo_category = {
  id: 1,
  label: 'Demo',
  parent_id: null,
  parent: null,
  children: null,
} as any;

describe('CategoryController', () => {
  beforeEach(() => {
    (Category.findAll as jest.Mock).mockReturnValue([demo_category]);
    (Category.findByPk as jest.Mock).mockReturnValue(demo_category);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('getCategories', () => {
    it('should call findAll in categories model and return 200', async () => {
      const req = { params: { userId: '1' } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();
      const spyFindAll = jest.spyOn(Category, 'findAll');

      await CategoryController.getCategories(req, res, next);

      // Assert
      expect(spyFindAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: [demo_category],
        status: 'success',
      });
    });
  });

  describe('addCategory', () => {
    it('should call create in categories model and return 200', async () => {
      const req = { body: { label: 'Demo', parent_id: null } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnValue(demo_category),
      } as unknown as Response;
      const next = jest.fn();
      const spyFindOne = jest
        .spyOn(Category, 'findOne')
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(demo_category);
      const spyCreate = jest.spyOn(Category, 'create');

      await CategoryController.addCategory(req, res, next);

      // Assert
      expect(spyFindOne).toHaveBeenCalled();
      expect(spyCreate).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe('getCategorySubtree', () => {
    it('should call findByPk in categories model and return 200', async () => {
      const req = { params: { id: 1 } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();
      const spyFindByPk = jest.spyOn(Category, 'findByPk');

      // Act
      await CategoryController.getCategorySubtree(req, res, next);

      // Assert
      expect(spyFindByPk).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe('changeCategoryParent', () => {
    it('should call create in categories model and return 200', async () => {
      const req = { params: { id: 1 }, body: { parent_id: 2 } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();
      const spyFindOne = jest.spyOn(Category, 'findByPk').mockReturnValue(demo_category);

      await CategoryController.changeCategoryParent(req, res, next);

      // Assert
      expect(spyFindOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: demo_category,
        status: 'success',
      });
    });
  });
});
