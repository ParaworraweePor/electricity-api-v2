const request = require('supertest'); 
const app = require('../index'); 
describe('Electricity API Endpoints', () => { 
// API 1: Total electricity usages for each year
test('GET /api/usage/total-by-year', async () => { 
    const res = await request(app).get('/api/usage/total-by-year'); 
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('2566');
}); 

test('GET /api/usage/total-by-year - response shape', async () => {
    const res = await request(app).get('/api/usage/total-by-year');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(Object.keys(res.body)).toContain('2566');
    expect(Object.values(res.body).every(value => typeof value === 'number')).toBeTruthy();
});

// API 2: Total electricity users for each year 
test('GET /api/users/total-by-year', async () => { 
    const res = await request(app).get('/api/users/total-by-year'); 
    expect(res.statusCode).toEqual(200); 
    expect(res.body).toHaveProperty('2566'); 
});

test('GET /api/users/total-by-year - response shape', async () => {
    const res = await request(app).get('/api/users/total-by-year');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(Object.keys(res.body)).toContain('2566');
    expect(Object.values(res.body).every(value => typeof value === 'number')).toBeTruthy();
});

// API 3: Usage of specific province by specific year 
test('GET /api/usage/:province/:year', async () => { 
    const res = await request(app).get('/api/usage/Bangkok/2566'); 
    expect(res.statusCode).toEqual(200); 
    expect(res.body).toHaveProperty('province_name', 'Bangkok'); 
    expect(res.body).toHaveProperty('year', 2566); 
});

test('GET /api/usage/Bangkok/2566 - response contains province_code', async () => {
    const res = await request(app).get('/api/usage/Bangkok/2566');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('province_code', 10);
    expect(res.body).toHaveProperty('residential_kwh');
});

// API 4: Users of specific province by specific year 
test('GET /api/users/:province/:year', async () => { 
    const res = await request(app).get('/api/users/Bangkok/2566'); 
    expect(res.statusCode).toEqual(200); 
    expect(res.body).toHaveProperty('province_name', 'Bangkok'); 
    expect(res.body).toHaveProperty('year', 2566); 
});

test('GET /api/users/Bangkok/2566 - response contains province_code and counts', async () => {
    const res = await request(app).get('/api/users/Bangkok/2566');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('province_code', 10);
    expect(res.body).toHaveProperty('residential_count');
    expect(res.body.residential_count).toBeGreaterThan(0);
});

// API 5: Usage history by specific province 
test('GET /api/usage-history/:province', async () => { 
    const res = await request(app).get('/api/usage-history/Bangkok'); 
    expect(res.statusCode).toEqual(200); 
    expect(Array.isArray(res.body)).toBeTruthy(); 
    expect(res.body.length).toBeGreaterThan(0); 
    expect(res.body[0]).toHaveProperty('province_name', 'Bangkok');
});

test('GET /api/usage-history/Bangkok - all results are for Bangkok', async () => { 
    const res = await request(app).get('/api/usage-history/Bangkok'); 
    expect(res.statusCode).toEqual(200); 
    expect(Array.isArray(res.body)).toBeTruthy(); 
    expect(res.body.length).toBeGreaterThan(0); 
    expect(res.body.every(item => item.province_name === 'Bangkok')).toBeTruthy();
});

// API 6: User history by specific province 
test('GET /api/users-history/:province', async () => { 
    const res = await request(app).get('/api/users-history/Bangkok'); 
    expect(res.statusCode).toEqual(200); 
    expect(Array.isArray(res.body)).toBeTruthy(); 
    expect(res.body.length).toBeGreaterThan(0); 
    expect(res.body[0]).toHaveProperty('province_name', 'Bangkok');   
});

test('GET /api/users-history/Bangkok - all results are for Bangkok', async () => { 
    const res = await request(app).get('/api/users-history/Bangkok'); 
    expect(res.statusCode).toEqual(200); 
    expect(Array.isArray(res.body)).toBeTruthy(); 
    expect(res.body.length).toBeGreaterThan(0); 
    expect(res.body.every(item => item.province_name === 'Bangkok')).toBeTruthy();   
});

// Error Handling Test
test('GET /api/usage/:province/:year - Not Found', async () => { 
    const res = await request(app).get('/api/usage/unknownprovince/9999'); 
    expect(res.statusCode).toEqual(200); 
    expect(res.body).toHaveProperty('message', 'Data not found'); 
});


});