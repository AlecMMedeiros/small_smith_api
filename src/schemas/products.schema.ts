import Joi from 'joi';

export default Joi.object({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
});
