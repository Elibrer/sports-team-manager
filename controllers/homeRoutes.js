const router = require('express').Router();
const { User } = require('../models');
const auth = require('../utils/auth');

router.get('/', auth, async (req, res) => {
  try {
    if (req.session.logged_in) {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['username', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));
    
    res.render('manage', {
      users,
      logged_in: req.session.logged_in,
    });
  }
  else {
    res.redirect('/login');
  }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/manage', auth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['username', 'ASC']],
      });
      const users = userData.map((project) => project.get({ plain: true }));
      res.render('manage', {
        users,
        logged_in: req.session.logged_in,
        });
        } catch (err) {
          res.status(500).json(err);
        }
});
      

module.exports = router;
