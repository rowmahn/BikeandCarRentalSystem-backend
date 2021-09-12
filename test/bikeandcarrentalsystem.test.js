const Vehicle = require('../models/vehicle');
const mongoose = require('mongoose');
 
const url = 'mongodb://localhost:27017/test_db_web';
 
beforeAll(async() => {
    await mongoose.connect(url,{
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
 
afterAll(async()=>{
    await mongoose.connection.close();
});
 
    describe('Vehicle Schema Test',()=>{
    it('Add Vehicle Test',()=>{
        const vehicle={
            'vehicletype': 'Bike',
            'vehiclecompany':'test',
            'vehiclemodel':'test',
            'vehiclenumber':'test',
            'vehicleprice':'555',
            'vehicleownercontact':'test'
        };
 
        return Vehicle.create(vehicle)
        .then((pro_ret)=>{
            expect(pro_ret.vehicletype).toEqual('Bike');
        })
    });
 
    it('Update Vehicle Test', async()=>{
        return Vehicle.findOneAndUpdate({_id: Object("613d85646220c23711c75cb0")},
        {$set: {vehiclemodel:'GGixer'}})
        .then((result)=>{
            expect(result.vehiclemodel).toEqual('GGixer')
        })
    });
 
    it('Delete Vehicle Test',async()=>{
        const status = await Vehicle.deleteMany();
        expect(status.ok).toBe(1);
    });
 
})