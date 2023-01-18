
const initialize = (function(){

    const data = (function(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        
        if (dd < 10) {
        dd = '0' + dd;
        }
        
        if (mm < 10) {
        mm = '0' + mm;
        } 
            
        today = yyyy + '-' + mm + '-' + dd;

        $('#day').attr('max', today);
        $('#day').attr('value', today);
    })();

    const option = (function(){
        fetch('https://openexchangerates.org/api/latest.json?app_id=f0489c22f7cd4ca38d25098efad60541')
        .then((response) => response.json())
        .then((data) => {
            originalcurrency = $("#original-currency");
            targetcurrency = $("#target-currency");

            for(let i = 0; i<Object.keys(data["rates"]).length; i++) {
                const currency = Object.keys(data["rates"])[i];
                originalcurrency.append($('<option>', {
                    value: currency,
                    text: currency
                }));

                targetcurrency.append($('<option>', {
                    value: currency,
                    text: currency
                }));
            }
        });
    })();
})();

