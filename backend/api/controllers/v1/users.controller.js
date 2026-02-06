const userHelpers = require("../../../helpers/user.helpers");

module.exports = {
  getUsers: () => {},
  getUser: () => {},
  createAdmin: async (req, res) => {
    try {
      const response = await userHelpers.register({
        ...req.body,
        isAdmin: true,
      });

      if (!response.status) {
        return res.status(400).json({
          success: false,
          message: response.message,
        });
      }

      const { user } = response;

      req.session.loggedIn = true;
      req.session.user = user;

      res.status(201).json({
        success: true,
        user,
      });
    } catch (err) {
      console.error("Register Controller Error:", err);

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  updateAdmin: () => {},
  deleteAdmin: () => {},
  getMe: () => {},
  updateMe: () => {},
  deleteMe: () => {},
};
