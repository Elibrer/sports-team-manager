const router = require('express').Router();
const { Team, Player, Position } = require('../models');
const auth = require('../utils/auth');

router.get('/', auth, async (req, res) => {
  try {

    const teamData = await Team.findAll({
      include: [{model: Player, include: Position}]
      //attributes: { exclude: ['password'] },
      //order: [['username', 'ASC']],
    });
    const teams = teamData.map((project) => project.get({ plain: true }));
    console.log({
      teams,
      logged_in: req.session.logged_in,
    })
    for(const team of teams) console.log(team)
    res.render('manage', {
      teams,
      logged_in: req.session.logged_in,
    });
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
