function formatMoney(price){
    return "$" + Intl.NumberFormat('en-US',{
        minimumFractionDigits : 0
    }).format(price);

}

export default formatMoney;