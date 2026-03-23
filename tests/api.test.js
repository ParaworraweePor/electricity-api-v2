const request = require('supertest'); 
const app = require('../index'); 
describe('Electricity API Endpoints', () => { 
// API 1: Total electricity usages for each year
test('GET /api/usage/total-by-year', async () => { 
    const res = await request(app).get('/api/usage/total-by-year'); 
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('2566');
}); 

// API 2: Total electricity users for each year 
test('GET /api/users/total-by-year', async () => { 
    const res = await request(app).get('/api/users/total-by-year'); 
    expect(res.statusCode).toEqual(200); 
    expect(res.body).toHaveProperty('2566'); 
});

// API 3: Usage of specific province by specific year 
test('GET /api/usage/:province/:year', async () => { 
    const res = await request(app).get('/api/usage/Bangkok/2566'); 
    expect(res.statusCode).toEqual(200); 
    expect(res.body).toHaveProperty('province_name', 'Bangkok'); 
    expect(res.body).toHaveProperty('year', 2566); 
});

// API 4: Users of specific province by specific year 
test('GET /api/users/:province/:year', async () => { 
    const res = await request(app).get('/api/users/Bangkok/2566'); 
    expect(res.statusCode).toEqual(200); 
    expect(res.body).toHaveProperty('province_name', 'Bangkok'); 
    expect(res.body).toHaveProperty('year', 2566); 
});

// API 5: Usage history by specific province 
test('GET /api/usage-history/:province', async () => { 
    const res = await request(app).get('/api/usage-history/Bangkok'); 
    expect(res.statusCode).toEqual(200); 
    expect(Array.isArray(res.body)).toBeTruthy(); 
    expect(res.body.length).toBeGreaterThan(0); 
    expect(res.body[0]).toHaveProperty('province_name', 'Bangkok');
});

// API 6: User history by specific province 
test('GET /api/users-history/:province', async () => { 
    const res = await request(app).get('/api/users-history/Bangkok'); 
    expect(res.statusCode).toEqual(200); 
    expect(Array.isArray(res.body)).toBeTruthy(); 
    expect(res.body.length).toBeGreaterThan(0); 
    expect(res.body[0]).toHaveProperty('province_name', 'Bangkok');   
});

// Error Handling Test
test('GET /api/usage/:province/:year - Not Found', async () => { 
    const res = await request(app).get('/api/usage/unknownprovince/9999'); 
    expect(res.statusCode).toEqual(200); 
    expect(res.body).toHaveProperty('message', 'Data not found'); 
});
});