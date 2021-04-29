const client = require('../helpers/index');
const axios =  require('axios');


module.exports={

    rockets:async (req,res)=>{
        try{
            const reply = await client.redis.Get_async('rockets');
            if(reply){
                console.log('using cached data');
                res.send(JSON.parse(reply));
                return
            }
            const response = await axios.get('https://api.spacexdata.com/v3/rockets');
            const saveResult = await client.redis.Set_async('rockets',JSON.stringify(response.data),'EX',5);
            console.log(response);
            res.send(response.data)
            console.log('new data saved in cache');
        }
        catch(error){
            res.send(error)
        }
    },

    oneRocket: async (req,res)=>{
        try{
            const {rocket_id} = req.params;
            const reply = await client.redis.Get_async(rocket_id);
            if(reply){
                console.log('using cached data');
                res.send(JSON.parse(reply));
                return
            }
            const response = await axios.get(`https://api.spacexdata.com/v3/rockets/${rocket_id}`);   
            const saveResult = await client.redis.Set_async(rocket_id,JSON.stringify(response.data),'EX',5);
            console.log(response);
            res.send(response.data)
            console.log('new data saved in cache');
        }
        catch(error){
            res.send(error)
        }
    },

    country: async (req,res)=>{
        try{
            const obj = {
                name : req.body.name,
                language : req.body.language,
                currency : req.body.currency,
            }
        const saveResult = await client.redis.Hmset_async(req.body.countryKey,obj);
        await client.redis.EX_async(req.body.countryKey,req.body.EX);
        const reply = await client.redis.HgetAll_async("country_1");
        console.log(reply);
        res.send(reply);
        }
        catch(error){
            console.log(error);
            res.send(error);
        }
    }

}