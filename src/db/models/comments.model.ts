import { Model, UUIDV4 } from "sequelize";

interface CommentsAttributes {
  id: number;
  title: string;
  description: string;
  date: string;
  user_id: number;
  product_id: number;
}

export default (sequelize: any, DataTypes: any) => {
  class Comments
    extends Model<CommentsAttributes>
    implements CommentsAttributes
  {
    id!: number;
    title!: string;
    description!: string;
    date!: string;
    user_id!: number;
    product_id!: number;
    static associate(models: any) {}
  }
  Comments.init(
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
      user_id: {
        type: DataTypes.number,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.number,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  return Comments;
};
