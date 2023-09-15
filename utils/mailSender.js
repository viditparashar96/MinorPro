const nodemailer=require("nodemailer")
require('dotenv').config()

exports.mailSender=async(email,title,body)=>{
    try {
        const transpoter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port: 587,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
           
        })

        let info=await transpoter.sendMail({
            from:process.env.MAIL_USER,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        // console.log(info)
        // return info
    } catch (error) {
        console.log(error)
    }
}