import bcrypt from 'bcrypt'


export function hashear(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}

export function validatePassword(received,saved){
    return bcrypt.compareSync(received,saved)
}