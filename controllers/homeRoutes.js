const router = require('express').Router();
const { User, Player, Team } = require('../models');
const auth = require('../utils/auth');


router.get('/', auth, async (req, res) => {
  try {

    if (req.session.logged_in) {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['username', 'ASC']],
    });

    const teamData = await Team.findAll();

    let playerData = [];
    if (req.session.is_admin) {
      playerData = await Player.findAll({
        include: {
            model: Team,
            attributes: ['team_name'], 
        },   
        order: [['player_number', 'ASC']],
      });
    } else {
      playerData = await Player.findAll({
        where: { team_id: req.session.team_id },
        order: [['player_number', 'ASC']],
      });
    }

    const players = playerData.map((project) => project.get({ plain: true }));
    const users = userData.map((project) => project.get({ plain: true }));
    const teams = teamData.map((project) => project.get({ plain: true }));
    // module.exports = is_admin;
    res.render('manage', {
      users,
      players,
      teams,
      team_name: req.session.team_name,
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
    });

  }
  else {
    res.redirect('/login');
  }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/admin', async (req, res) => {
  try {
    const userData = await User.findAll({
      order: [['username', 'ASC']],
    });

    const teamData = await Team.findAll();

    res.render('admin', {
      userData,
      teamData,
      logged_in: req.session.logged_in,
      is_admin: req.session.is_admin,
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
