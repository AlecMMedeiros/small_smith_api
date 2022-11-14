import joi from 'joi';

export default joi.object({
  productsIds: joi.array().min(1).items(joi.number().min(1)
    .messages({ 'number.integer': '"productsIds" must include only numbers' }))
    .required()
    .messages({ 'array.min': '"productsIds" must include only numbers' }),
});
