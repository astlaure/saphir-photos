import bcrypt from 'bcrypt';

const hash = async (password: string) => {
  return bcrypt.hash(password, 10);
}

const compare = async (password: string, encoded: string) => {
  return bcrypt.compare(password, encoded);
}

export default {
  hash,
  compare,
}
