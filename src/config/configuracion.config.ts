export default() =>({
    app:{
        nombre:process.env.APPNAME,
        puerto:parseInt(process.env.APP_PORT ?? '4000', 10)
    },
    jwt:{
        secret: process.env.JWT_SECRET,
        expiresIn:process.env.JWT_EXPIRES_IN
    }
})