export  function getBeforDay(){
        let datee = new Date(); //2018-02-01
        let preDate = new Date(datee.getTime() - 24 * 60 * 60 * 1000)
        let year = preDate.getFullYear(); //2018
        let month = preDate.getMonth() + 1;  //2
        let date = preDate.getDate();  //
        if (month >= 1 && month <= 9) {
        month = "0" + month;
        }
        if (date >= 0 && date <= 9) {
        date = "0" + date;
        }
        return (year + '-' + month + '-' + date)
  
    }
