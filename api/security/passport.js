import bcrypt from 'bcryptjs';

export const hashPassword=(password)=>{
    try {
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(password,salt);
    } catch (error) {
        console.log(error)
    }
}

export const camparePassword=(password,raw)=>{
    return bcrypt.compareSync(password,raw);

}