import bcrypt from 'bcryptjs';

export const hashPassword=(password)=>{
    try {
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(password,salt);
    } catch (error) {
        console.log(error)
    }
}