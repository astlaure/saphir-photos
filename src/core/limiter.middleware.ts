import rateLimit from 'express-rate-limit';

const limiter = (minutes: number, max: number) => {
  return rateLimit({
    windowMs: minutes * 60 * 1000,
    max,
  });
};

export default limiter;
