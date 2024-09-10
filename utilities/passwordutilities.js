const bcrypt = require ('bcrypt');

// hash password
const hashpassword= async (password)=>{
      try{
            if (typeof password !=='string'){
                  password=string(password);
            }
      
      const salt= await bcrypt.genSalt(10);
      return await bcrypt.hash(password,salt);
}catch(error){
      console.error("error on hashing pass:",error.message);
      throw error;
}
};

//compare a password to hash password

// const comparepassword = async (password, hashedPassword) => {
//     return await bcrypt.compare(password, hashedPassword);
//   };

module.exports = { hashpassword };