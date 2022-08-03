import { Model, UUIDV4 } from "sequelize";

interface FavoritesAttributes {
  id: string;
}

export default (sequelize: any, DataTypes: any) => {
  class Favorites
    extends Model<FavoritesAttributes>
    implements FavoritesAttributes
  {
    id!: string;
    static associate(models: any) {
      Favorites.belongsTo(models.Users);
      Favorites.belongsTo(models.Products);
    }
  }
  Favorites.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Favorites",
    }
  );
  return Favorites;
};
