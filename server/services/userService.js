const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mailService");
const tokenService = require("./tokenService");
const UserDTO = require("../dtos/userDTO");
const ApiError = require("../exceptions/apiExceptions");

class UserService {
  async registration(email, username, password) {
    const candidate = await UserModel.findOne({ username });
    if (candidate) {
      throw ApiError.BadRequest(`User ${username} is already registered!`);
    }

    const activationLink = uuid.v4();
    const hashedPassword = await bcrypt.hash(password, 3);

    const user = await UserModel.create({
      email,
      password: hashedPassword,
      username,
      activationLink,
    });

    await mailService.sendActivationEmail(
      email,
      `${process.env.API_URL}/auth/activate/${activationLink}`
    );

    const userDto = new UserDTO(user);
    const tokens = tokenService.generateTockens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("Invalid activation link");
    }
    user.isActivated = true;
    user.save();
  }

  async login(username, password) {
    const user = await UserModel.findOne({ username });
    if (!user) {
      throw ApiError.BadRequest(`User ${username} not found`);
    }

    if (!user.isActivated) {
      throw ApiError.UnactivatedAccount();
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest(`Incorrect password`);
    }

    const userDto = new UserDTO(user);
    const tokens = tokenService.generateTockens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnathorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw ApiError.UnathorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDTO(user);
    const tokens = tokenService.generateTockens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}

module.exports = new UserService();
