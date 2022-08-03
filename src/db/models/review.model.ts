import { Model, UUIDV4 } from "sequelize";

interface ReviewAttributes {
  id: string;
  title: string;
  description: string;
  date: string;
  rating: number;
  user_id: number;
  product_id: number;
}

export default (sequelize: any, DataTypes: any) => {
  class Review extends Model<ReviewAttributes> implements ReviewAttributes {
    id!: string;
    title!: string;
    description!: string;
    date!: string;
    rating!: number;
    user_id!: number;
    product_id!: number;
    static associate(models: any) {}
  }
  Review.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
