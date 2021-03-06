const encryption = require('../services/encryption')

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        googleId:{
            type: DataTypes.STRING
        },
        facebookId:{
            type: DataTypes.STRING
        }
    }, {
        underscored: true,
        // hooks: {
        //     beforeCreate: async (user, options) => {
        //         console.log(user.password)
        //         user.password = await encryption.hashPassword(user.password)
        //         return user
        //     },
        //     beforeUpdate: async(user, options) => {
        //         if(user._previousDataValues.password != user.password)
        //             user.password = await encryption.hashPassword(user.password)
        //         return user
        //     }
        // },
        defaultScope: {
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        }
    });

    // User.associate = (models) => {
    //     models.user.belongsTo(models.role)
    // }
    return User;
}
