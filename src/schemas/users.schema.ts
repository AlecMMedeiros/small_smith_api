import joi from 'joi';

export default joi.object({
  username: joi.string().min(3).required(),
  classe: joi.string().min(3).required(),
  level: joi.number().min(1).required(),
  password: joi.string().min(8).required(),
});
