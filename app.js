const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(express.json());
console.log('coming inside api gateway');
// Create a proxy instance for each service
const service1Proxy = createProxyMiddleware({ target: 'http://service1:3001', changeOrigin: true });
const service2Proxy = createProxyMiddleware({ target: 'http://service2:3002', changeOrigin: true });

// Define routes for your services using the respective proxy
app.use('/service1', service1Proxy);
app.use('/service2', service2Proxy);

app.get('/', (req, res) => {
    res.send('Api gateway');
});
app.listen(3000, () => {
    console.log('listening app on port 3000');
})