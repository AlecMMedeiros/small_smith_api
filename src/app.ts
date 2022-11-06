import express from 'express';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import loginRoutes from './routes/login.routes';

const app = express();

app.use(express.json());

app.use('/login', loginRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);

export default app;
