import { Model, UUIDV4 } from "sequelize";

interface ReviewAttributes {
  id: string;
  title: string;
  description: string;
  date: string;
  rating: number;
  /*   user_id: number;
  product_id: number; */
}

export default (sequelize: any, DataTypes: any) => {
  class Review extends Model<ReviewAttributes> implements ReviewAttributes {
    id!: string;
    title!: string;
    description!: string;
    date!: string;
    rating!: number;
    /*     user_id!: number;
    product_id!: number; */
    static associate(models: any) {
      Review.belongsTo(models.Users);
      Review.belongsTo(models.Products);
    }
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
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.NOW,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      /*       user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }, */
    },
    {
      sequelize,
      timestamps: true,
      createdAt: false,
      updatedAt: false,
      modelName: "Review",
    }
  );
  return Review;
};
