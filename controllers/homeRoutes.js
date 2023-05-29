const router = require('express').Router();
const { User, Player } = require('../models');
const auth = require('../utils/auth');


router.get('/', auth, async (req, res) => {
  try {
    if (req.session.logged_in) {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['username', 'ASC']],
    });

    let playerData = [];

    if (req.session.is_admin) {
      playerData = await Player.findAll({
        order: [['first_name', 'ASC']],
      });
    } else {
      console.log(req.session.team_id)
      playerData = await Player.findAll({
        where: { team_id: req.session.team_id },
        order: [['first_name', 'ASC']],
      });
    }
    const players = playerData.map((project) => project.get({ plain: true }));
    const users = userData.map((project) => project.get({ plain: true }));
    players.sort((a, b) => a.player_number - b.player_number);
    console.log(players)
    res.render('manage', {
      users,
      team_name: req.session.team_name,
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
      players,
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
