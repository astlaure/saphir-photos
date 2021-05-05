import crypto from 'crypto';
import User from '../../users/user.model';

const TokenUtil = {
  consume: async (token: string) => {
    const user = await User.findOne({ where: { token } });

    if (user) {
      user.token = null;
      await user.save();
    }

    return user;
  },
  issue: async (user: User) => {
    const token = crypto.randomBytes(32).toString('hex');
    await User.update({ token }, { where: { id: user.id } });
    return token;
  },
}

export default TokenUtil;
