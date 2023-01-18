var converter = new Vue({
    el:'#converter',
    data:{
        original: 'AED',
        target: 'AED',
        amount: '',
        date: '',
        final: ''
    },
    methods:{
        convert(){
            $('#result').hide();
            originalcurrency = this.original;
            //console.log(this.original + ' ' + originalcurrency);
            targetcurrency = this.target
            //console.log(this.target);
            inputamount = this.amount
            //console.log(this.amount);
            selecteddate = new Date(this.date);
            //console.log(new Date(this.date));

            const json = JSON.stringify({originalcurrency, targetcurrency, inputamount, selecteddate});
            //console.log(json);

            fetch("/convert", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: json
            })
            .then((res) => res.json() )
            .then((json) => {
                if (json.status == "error") {
                    $('#warning').show();
                    $('#warning').text(json.error);
                } else {
                    this.final = json.amountInTargetCurrency;
                    //$("#final-value").text(final);
                    $('#warning').hide();
                    $('#result').show();
                }
            }).catch((err) => {
                console.log(err);
            });
        },

        hideResult(){
            $('#result').hide();
        }
    }
});