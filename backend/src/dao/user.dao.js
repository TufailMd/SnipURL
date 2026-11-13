import userModel from "../models/user.model.js";

export const findUserByEmail = async (email) => {
  return await userModel.findOne({ email });
};

export const findUserByUsernameOrEmail = async (username, email) => {
  return await userModel.findOne({
    $or: [{ username }, { email }],
  });
};
export const findUserById = async (id) => {
  return await userModel.findById(id);
};

export const createUser = async (userData) => {
  const newUser = new userModel(userData);
  await newUser.save();
  return newUser;
};
