const { adminModel } = require("../models/ArchiveModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwt_security_key } = require("../config/env.config");

const create = async ({ ...obj }) => {
  const { name, email, password } = obj;

  const adminExists = await adminModel.findOne({ email: email });

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  if (adminExists) {
    return { validEmail: adminExists };
  } else {
    const createAdmin = await adminModel.create({ name, email, passwordHash });
    return { result: createAdmin };
  }
};

const login = async ({ ...obj }) => {
  const { email, password } = obj;
  const adminExists = await adminModel.findOne({ email: email });
  if (!adminExists) {
    return { invalidEmail: true };
  }
  const correctPassword = await bcrypt.compare(
    password,
    adminExists.passwordHash
  );

  if (!correctPassword) {
    return { invalidPassword: true };
  } else {
    const token = jwt.sign(
      {
        admin: adminExists._id,
      },
      jwt_security_key
    );
    return { result: token };
  }
};

module.exports = { create, login };
