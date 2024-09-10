const express=require('express')
const router=express.Router();
const usercontroll=require('../controllers/usercontroller')




router.post('/register',usercontroll.register);
router.post('/login',usercontroll.login);

router.post('/forgot-password', usercontroll.forgottpassword);
router.post('/reset-password', usercontroll.resetpassword);

router.get('/reset-password', (req, res) => {
    const token = req.query.token;  // Access the token from query parameter
    if (!token) {
        return res.status(400).send('Invalid or missing token');
    }
    res.render('user/resetpassword', { token });  // Pass the token to the EJS view
});

// router.get('/logout', (req, res) => {
//     req.session.destroy(err => {
//       if (err) {
//         return res.status(500).send('Error logging out');
//       }
//       res.redirect('/login');
//     });
//   });
  



module.exports=router
