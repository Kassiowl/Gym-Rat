

function writeData(data)
{
    fs.writeFile('food_data/food.json', data, function ( err )
    {
        if ( err ) return console.log(err);
    })
}

function entryFood(form)
{ 
    let dataForm = ($(form).serializeArray())
    let lastId;
    (async function(storedData)
    {
        storedData = await getData();
        lastId = storedData.at(-1).id; //get last id in food.json
        console.log(storedData);

        let newInfo = {}

        newInfo.id = lastId+1;
        newInfo.name = dataForm[0].value
        newInfo.kcal = dataForm[1].value
        newInfo.protein = dataForm[2].value
        newInfo.carbo = dataForm[3].value 
        newInfo.fat = dataForm[4].value
        console.log(newInfo);
        storedData[lastId] = newInfo;    
        storedData = JSON.stringify(storedData);
        writeData(storedData);
    }());

}