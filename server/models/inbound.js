module.exports = (sequelize, DataTypes) => {
  let Inbound = sequelize.define(
    'inbounds',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      dealId: {
        type: DataTypes.INTEGER
      },
      product: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.STRING
      },
      quantity: {
        type: DataTypes.STRING
      },
      warehouse: {
        type: DataTypes.STRING
      },
      company: {
        type: DataTypes.STRING
      },
      individual: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.INTEGER
      },
      companyStatus: {
        type: DataTypes.INTEGER
      },
      propose: {
        type: DataTypes.INTEGER
      },
      proposeStatus: {
        type: DataTypes.INTEGER
      }
    },
    {}
  );
  return Inbound;
};
