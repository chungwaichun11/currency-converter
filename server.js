const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log("App start and listening on port 3000");
});

app.use(express.static(__dirname));
app.use(express.json());

app.get('/', (req, res)=>{
    res.sendFile('/currencyConverter.html', {root:__dirname});
});

app.post("/convert", (req, res) => {
    const {originalcurrency, targetcurrency, inputamount, selecteddate} = req.body;
    
    const today = new Date()
    const selected = new Date(selecteddate);

    if(!inputamount || !selecteddate) {
        res.json({status: "error", error: "Amount/Date cannont be empty!"});
    }  else {
        if(today.getFullYear() == selected.getFullYear() && today.getMonth() == selected.getMonth() && today.getDate() == selected.getDate()){
            fetch('https://openexchangerates.org/api/latest.json?app_id=f0489c22f7cd4ca38d25098efad60541')
            .then((response) => response.json())
            .then((data) => {
                for(let i = 0; i<Object.keys(data["rates"]).length; i++) {
                    if(Object.keys(data["rates"])[i] === originalcurrency){
                        amountInUSD = inputamount/Object.values(data["rates"])[i];
                        break;
                    }
                }
    
                for(let i = 0; i<Object.keys(data["rates"]).length; i++) {
                    if(Object.keys(data["rates"])[i] === targetcurrency){
                        amountInTargetCurrency = Object.values(data["rates"])[i]*amountInUSD;
                        res.json({status: "success", amountInTargetCurrency});
                        break;
                    }
                }
            });
        } else {
            let queryStringDate = new Date(selecteddate).toISOString().substring(0, 10);
            //console.log('you are fetching ' + queryStringDate);
            const url = 'https://openexchangerates.org/api/historical/' + queryStringDate + '.json?app_id=f0489c22f7cd4ca38d25098efad60541';
            fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data["rates"]);
                for(let i = 0; i<Object.keys(data["rates"]).length; i++) {
                    if(Object.keys(data["rates"])[i] === originalcurrency){
                        amountInUSD = inputamount/Object.values(data["rates"])[i];
                        break;
                    }
                }
    
                for(let i = 0; i<Object.keys(data["rates"]).length; i++) {
                    if(Object.keys(data["rates"])[i] === targetcurrency){
                        amountInTargetCurrency = Object.values(data["rates"])[i]*amountInUSD;
                        res.json({status: "success", amountInTargetCurrency});
                        break;
                    }
                }
            });
        }
    }
});
