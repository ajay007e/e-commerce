const db = require("../config/connection");
const collections = require("../config/collection");

const ObjectID = require("mongodb").ObjectId;

const bcrypt = require("bcrypt");
const crypto = require("crypto");

module.exports = {
  register: (user) => {
    return new Promise((resolve, reject) => {
      const { name, email, password, isAdmin = false } = user;

      if (!name || name.trim().length < 3) {
        return resolve({
          status: false,
          message: "Name must be at least 3 characters long",
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        return resolve({
          status: false,
          message: "Invalid email address",
        });
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!password || !passwordRegex.test(password)) {
        return resolve({
          status: false,
          message:
            "Password must be at least 8 characters and include uppercase, lowercase, and number",
        });
      }

      db.get()
        .collection(collections.USERS_COLLECTION)
        .findOne({ email: email.toLowerCase() })
        .then((existingUser) => {
          if (existingUser) {
            return resolve({
              status: false,
              message: "Email already exists",
            });
          }
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const verifyToken = crypto.randomBytes(32).toString("hex");
              const verifyTokenExpiry = new Date(
                Date.now() + 24 * 60 * 60 * 1000,
              );

              const newUser = {
                name: name.trim(),
                email: email.toLowerCase(),
                password: hashedPassword,
                role: isAdmin ? "admin" : "user",

                isVerified: false,
                verifyToken,
                verifyTokenExpiry,

                createdAt: new Date(),
              };

              return db
                .get()
                .collection(collections.USERS_COLLECTION)
                .insertOne(newUser)
                .then((result) => {
                  newUser._id = result.insertedId;

                  delete newUser.password;

                  // TODO: Send verification email here
                  const link = `https://yourfrontend.com/verify-email?token=${verifyToken}`;

                  resolve({
                    status: true,
                    user: newUser,
                    message:
                      "Registration successful. Please verify your email.",
                  });
                });
            })
            .catch((err) => {
              console.error("Hash Error:", err);
              reject(err);
            });
        })

        .catch((err) => {
          console.error("Find Error:", err);
          reject(err);
        });
    });
  },
  login: (data) => {
    return new Promise((resolve, reject) => {
      const { email, password } = data;

      if (!email || !password) {
        return resolve({
          status: false,
          message: "Email and password are required",
        });
      }

      db.get()
        .collection(collections.USERS_COLLECTION)
        .findOne({ email: email.toLowerCase() })
        .then((user) => {
          if (!user) {
            return resolve({
              status: false,
              message: "Invalid email",
            });
          }
          bcrypt
            .compare(password, user.password)
            .then((isMatch) => {
              if (!isMatch) {
                return resolve({
                  status: false,
                  message: "Invalid password",
                });
              }
              delete user.password;
              resolve({
                status: true,
                user,
              });
            })
            .catch((err) => {
              console.error("Compare Error:", err);
              reject(err);
            });
        })
        .catch((err) => {
          console.error("Find Error:", err);
          reject(err);
        });
    });
  },
  forgetPassword: (data) => {
    return new Promise((resolve, reject) => {
      const { email } = data;
      if (!email) {
        return resolve({
          status: false,
          message: "Email is required",
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return resolve({
          status: false,
          message: "Invalid email format",
        });
      }

      const resetToken = crypto.randomBytes(32).toString("hex");

      const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

      db.get()
        .collection(collections.USERS_COLLECTION)
        .findOne({ email: email.toLowerCase() })
        .then((user) => {
          // Always return success (prevent email probing)
          if (!user) {
            return resolve({
              status: true,
              message: "If this email exists, a reset link was sent",
            });
          }

          return db
            .get()
            .collection(collections.USERS_COLLECTION)
            .updateOne(
              { _id: user._id },
              {
                $set: {
                  resetToken,
                  resetTokenExpiry,
                },
              },
            )
            .then(() => {
              // TODO: Send email here
              const resetLink = `https://yourfrontend.com/reset-password?token=${resetToken}`;

              resolve({
                status: true,
                message: "If this email exists, a reset link was sent",
              });
            });
        })
        .catch((err) => {
          console.error("Forgot Password Helper Error:", err);
          reject(err);
        });
    });
  },
  resetPassword: (data) => {
    return new Promise((resolve, reject) => {
      const { token, password } = data;
      if (!token || !password) {
        return resolve({
          status: false,
          message: "Token and password are required",
        });
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(password)) {
        return resolve({
          status: false,
          message:
            "Password must be at least 8 characters and include uppercase, lowercase, and number",
        });
      }

      db.get()
        .collection(collections.USERS_COLLECTION)
        .findOne({
          resetToken: token,
          resetTokenExpiry: { $gt: new Date() },
        })
        .then((user) => {
          if (!user) {
            return resolve({
              status: false,
              message: "Invalid or expired token",
            });
          }
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              return db
                .get()
                .collection(collections.USERS_COLLECTION)
                .updateOne(
                  { _id: user._id },
                  {
                    $set: {
                      password: hashedPassword,
                      passwordChangedAt: new Date(),
                    },
                    $unset: {
                      resetToken: "",
                      resetTokenExpiry: "",
                    },
                  },
                )
                .then(() => {
                  resolve({
                    status: true,
                    message: "Password reset successful",
                  });
                });
            })
            .catch((err) => {
              console.error("Hash Error:", err);
              reject(err);
            });
        })
        .catch((err) => {
          console.error("Reset Password Helper Error:", err);
          reject(err);
        });
    });
  },
  changePassword: (data, userId) => {
    return new Promise((resolve, reject) => {
      const { oldPassword, newPassword } = data;
      if (!oldPassword || !newPassword) {
        return resolve({
          status: false,
          message: "Old password and new password are required",
        });
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        return resolve({
          status: false,
          message:
            "New password must be at least 8 characters and include uppercase, lowercase, and number",
        });
      }

      db.get()
        .collection(collections.USERS_COLLECTION)
        .findOne({ _id: new ObjectId(userId) })
        .then((user) => {
          if (!user) {
            return resolve({
              status: false,
              message: "User not found",
            });
          }
          bcrypt
            .compare(oldPassword, user.password)
            .then((isMatch) => {
              if (!isMatch) {
                return resolve({
                  status: false,
                  message: "Old password is incorrect",
                });
              }

              bcrypt
                .hash(newPassword, 10)
                .then((hashedPassword) => {
                  return db
                    .get()
                    .collection(collections.USERS_COLLECTION)
                    .updateOne(
                      { _id: user._id },
                      {
                        $set: {
                          password: hashedPassword,
                          passwordChangedAt: new Date(),
                        },
                      },
                    )
                    .then(() => {
                      resolve({
                        status: true,
                        message: "Password changed successfully",
                      });
                    });
                })
                .catch((err) => {
                  console.error("Hash Error:", err);
                  reject(err);
                });
            })
            .catch((err) => {
              console.error("Compare Error:", err);
              reject(err);
            });
        })
        .catch((err) => {
          console.error("Find User Error:", err);
          reject(err);
        });
    });
  },
  verifyEmail: (data) => {
    return new Promise((resolve, reject) => {
      const { token } = data;
      if (!token) {
        return resolve({
          status: false,
          message: "Verification token is required",
        });
      }
      db.get()
        .collection(collections.USERS_COLLECTION)
        .findOne({
          verifyToken: token,
          verifyTokenExpiry: { $gt: new Date() }, // not expired
        })
        .then((user) => {
          if (!user) {
            return resolve({
              status: false,
              message: "Invalid or expired verification link",
            });
          }
          return db
            .get()
            .collection(collections.USERS_COLLECTION)
            .updateOne(
              { _id: user._id },
              {
                $set: {
                  isVerified: true,
                  verifiedAt: new Date(),
                },
                $unset: {
                  verifyToken: "",
                  verifyTokenExpiry: "",
                },
              },
            )
            .then(() => {
              resolve({
                status: true,
                message: "Email verified successfully",
              });
            });
        })
        .catch((err) => {
          console.error("Verify Email Helper Error:", err);
          reject(err);
        });
    });
  },

  resendEmailVerification: (data) => {
    return new Promise((resolve, reject) => {
      const { email } = data;
      if (!email) {
        return resolve({
          status: false,
          message: "Email is required",
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return resolve({
          status: false,
          message: "Invalid email format",
        });
      }

      db.get()
        .collection(collections.USERS_COLLECTION)
        .findOne({ email: email.toLowerCase() })
        .then((user) => {
          // Security: Always return success
          if (!user) {
            return resolve({
              status: true,
              message: "If this email exists, a verification link was sent",
            });
          }

          if (user.isVerified) {
            return resolve({
              status: false,
              message: "Email already verified",
            });
          }
          const verifyToken = crypto.randomBytes(32).toString("hex");
          const verifyTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

          return db
            .get()
            .collection(collections.USERS_COLLECTION)
            .updateOne(
              { _id: user._id },
              {
                $set: {
                  verifyToken,
                  verifyTokenExpiry,
                },
              },
            )
            .then(() => {
              // TODO: Send email
              const link = `https://yourfrontend.com/verify-email?token=${verifyToken}`;
              resolve({
                status: true,
                message: "If this email exists, a verification link was sent",
              });
            });
        })
        .catch((err) => {
          console.error("Resend Verification Helper Error:", err);
          reject(err);
        });
    });
  },
};
