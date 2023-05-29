const router = require('express').Router();
const { User, Team } = require('../../models');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      // attributes: { exclude: ['password'] },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    if ( req.session.logged_in === true && req.session.is_admin === true) {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Team, attributes: ['team_name'] }],
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  }} catch (err) {
    res.status(500).json(err);
  }
});

// Create a new user
router.post('/', async (req, res) => {
  console.log("HELLO")

  console.log(req.body)
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      is_admin: req.body.is_admin,
    }, {individualHooks: true});
    if (req.body.team_name) {
      const newTeam = await Team.create({
        team_name: req.body.team_name,
        user_id: newUser.id,
      });
    }
    console.log("HELLO")



    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update an existing user by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.update({
      id: req.body.id,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      is_admin: req.body.is_admin,
    },
      {
        where: {
          id: req.params.id,
        },
        individualHooks: true
      }
      );
    if (!updatedUser[0]) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully' });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email
      },
    });
    let team = {};

    if (!dbUserData.is_admin) {
      team = await Team.findOne({
        where: {
          id: dbUserData.id,
        },
      });
    } else {
      team = {
        team_name: 'Admin',
        id: 0,
      }
    }

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

  req.session.save(() => {
    req.session.logged_in = true;
    req.session.team_name = team.team_name;
    req.session.team_id = team.id;

    if (dbUserData.is_admin === true) {
      req.session.is_admin = true;
    } else {
      req.session.is_admin = false;
    }
    console.log(
      '🚀 ~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
      req.session.cookie
    );

    res
      .status(200)
      .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
