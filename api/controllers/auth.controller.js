import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import moment from "moment";

const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

const passwordLengthValidator = (password) => password.length >= 8;
const passwordUppercaseValidator = (password) => /[A-Z]/.test(password);
const passwordNumberValidator = (password) => /\d/.test(password);
const passwordSpecialCharacterValidator = (password) =>
  /[@$!%*?&]/.test(password);

const generatePassword = () => {
  const randomLower = lowerCase.charAt(
    Math.floor(Math.random() * lowerCase.length)
  );
  const randomUpper = upperCase.charAt(
    Math.floor(Math.random() * upperCase.length)
  );
  const randomSpecial = specialChars.charAt(
    Math.floor(Math.random() * specialChars.length)
  );
  const randomString = Math.random().toString(36).slice(-5);

  const password = randomLower + randomUpper + randomSpecial + randomString;
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || username.trim() === "") {
    return next(errorHandler(400, "Username must be provided"));
  }

  if (!email || email.trim() === "") {
    return next(errorHandler(400, "Email must be provided"));
  }

  if (!password || password.trim() === "") {
    return next(errorHandler(400, "Password must be provided"));
  }

  if (!passwordLengthValidator(password)) {
    return next(
      errorHandler(400, "Password must be at least 8 characters long.")
    );
  }

  if (!passwordUppercaseValidator(password)) {
    return next(
      errorHandler(400, "Password must contain at least one uppercase letter.")
    );
  }

  if (!passwordNumberValidator(password)) {
    return next(
      errorHandler(400, "Password must contain at least one number.")
    );
  }

  if (!passwordSpecialCharacterValidator(password)) {
    return next(
      errorHandler(
        400,
        "Password must contain at least one special character (@, $, !, %, *, ?, &)."
      )
    );
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return next(errorHandler(400, "Username is already taken"));
      }
      if (existingUser.email === email) {
        return next(errorHandler(400, "Email is already registered"));
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Signup was successful" });
  } catch (error) {
    console.error(error);
    return next(
      errorHandler(500, "Something went wrong. Please try again later.")
    );
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "Wrong credentials"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Wrong credentials"));
    }

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        expires: moment().add(1, "months").toDate(),
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword = generatePassword();
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
