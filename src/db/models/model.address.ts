
import { Model, UUIDV4} from 'sequelize';

interface AddressAttributes {
    id: number;
    province: string;
    city: string;
    locality: string;
    street_number: string;
    apartament_floor: string;
    zip_code: string;
}

module.exports =(sequelize: any, DataTypes: any) => {
    class Address extends Model<AddressAttributes>
    implements AddressAttributes {
        id!: number;
        province!: string;
        city!: string;
        locality!: string;
        street_number!: string;
        apartament_floor!: string;
        zip_code!: string;
        static associate(models: any){
            
        }
};
Address.init({
    id: {
        type: DataTypes.NUMBER,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
},
    province: {
        type: DataTypes.STRING,
        allowNull: false,
},
    city: {
        type: DataTypes.STRING,
        allowNull: false,
},
    locality: {
        type: DataTypes.STRING,
        allowNull: false,

},
    street_number: {
        type: DataTypes.STRING,
        allowNull: false,
},
    apartament_floor: {
        type: DataTypes.STRING,
        allowNull: false,
},
    zip_code: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    }, {
        sequelize,
        tableName: "address",
    });
    return "Address"
}