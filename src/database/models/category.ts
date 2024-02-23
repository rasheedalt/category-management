import { Model, Sequelize, DataTypes, Optional } from 'sequelize';
import db from '../database';

export interface CategoryAttributes {
  id?: number;
  label: string;
  parent_id?: number;
  parent?: Category;
  children?: Category[];
}

type CategoryCreationAttributes = Optional<CategoryAttributes, 'id'>;

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id?: number;
  public label!: string;
  public parent_id?: number;
  public parent?: Category;
  public children?: Category[];
}

Category.init(
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db.sequelize,
    tableName: 'categories',
    timestamps: true,
  },
);

Category.belongsTo(Category, {
  foreignKey: 'parent_id',
  as: 'parent',
});

Category.hasMany(Category, {
  foreignKey: 'parent_id',
  as: 'children',
  onDelete: 'CASCADE',
});

Category.sync();

export default Category;
