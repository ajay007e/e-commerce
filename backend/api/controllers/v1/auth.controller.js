const userHelpers = require("../../../helpers/user.helpers");

module.exports = {
  register: async (req, res) => {
    try {
      const response = await userHelpers.register(req.body);

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
  login: async (req, res) => {
    try {
      const response = await userHelpers.login(req.body);

      if (!response.status) {
        return res.status(401).json({
          success: false,
          message: response.message || "Invalid credentials",
        });
      }

      const { _id, name, email, role } = response.user;

      const user = {
        id: _id,
        name,
        email,
        isAdmin: role === "admin",
      };

      req.session.regenerate((err) => {
        if (err) return res.status(500).json({ success: false });

        req.session.loggedIn = true;
        req.session.user = user;

        res.json({ success: true, user });
      });
    } catch (err) {
      console.error("Login Controller Error:", err);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout Error:", err);
        return res.status(500).json({
          success: false,
          message: "Logout failed",
        });
      }
      res.clearCookie("connect.sid");
      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    });
  },
  refreshToken: (req, res) => {
    if (!req.session || !req.session.loggedIn) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    req.session.cookie.maxAge = 24 * 60 * 60 * 1000; // 1 day

    req.session.save((err) => {
      if (err) {
        console.error("Refresh Session Error:", err);

        return res.status(500).json({
          success: false,
          message: "Failed to refresh session",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Session refreshed",
        user: req.session.user,
      });
    });
  },
  getMe: (req, res) => {
    if (!req.session || !req.session.loggedIn) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }
    return res.status(200).json({
      success: true,
      user: req.session.user,
    });
  },
  forgetPassword: async (req, res) => {
    try {
      const response = await userHelpers.forgetPassword(req.body);
      if (!response.status) {
        return res.status(400).json({
          success: false,
          message: response.message,
        });
      }

      // Always success (security reason)
      return res.status(200).json({
        success: true,
        message: response.message,
      });
    } catch (err) {
      console.error("Forget Password Controller Error:", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const response = await userHelpers.resetPassword(req.body);
      if (!response.status) {
        return res.status(400).json({
          success: false,
          message: response.message,
        });
      }

      return res.status(200).json({
        success: true,
        message: response.message,
      });
    } catch (err) {
      console.error("Reset Password Controller Error:", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  changePassword: async (req, res) => {
    try {
      if (!req.session?.loggedIn) {
        return res.status(401).json({
          success: false,
          message: "Not authenticated",
        });
      }

      const userId = req.session.user.id;
      const response = await userHelpers.changePassword(req.body, userId);
      if (!response.status) {
        return res.status(400).json({
          success: false,
          message: response.message,
        });
      }

      return res.status(200).json({
        success: true,
        message: response.message,
      });
    } catch (err) {
      console.error("Change Password Controller Error:", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  verifyEmail: async (req, res) => {
    try {
      const response = await userHelpers.verifyEmail(req.body);
      if (!response.status) {
        return res.status(400).json({
          success: false,
          message: response.message,
        });
      }

      return res.status(200).json({
        success: true,
        message: response.message,
      });
    } catch (err) {
      console.error("Verify Email Controller Error:", err);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  resendEmailVerification: async (req, res) => {
    try {
      const response = await userHelpers.resendEmailVerification(req.body);

      if (!response.status) {
        return res.status(400).json({
          success: false,
          message: response.message,
        });
      }

      return res.status(200).json({
        success: true,
        message: response.message,
      });
    } catch (err) {
      console.error("Resend Verification Controller Error:", err);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};
