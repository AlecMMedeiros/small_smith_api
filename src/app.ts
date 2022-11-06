import express from 'express';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import loginRoutes from './routes/login.routes';
import ordersRoutes from './routes/orders.routes';

const app = express();

app.use(express.json());

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
app.use('/users', userRoutes);
app.use('/login', loginRoutes);

export default app;
