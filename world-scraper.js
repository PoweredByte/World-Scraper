const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

var colors = require('colors');
const fs = require('fs');
const fetch = require('node-fetch')


//REQUIRES AN AUTHCOOKIE
var authcookie = [
    ['Cookie', 'auth=PUT_COOKIE_HERE; Path=/']
];

Start()
async function Start() {

    fs.writeFile('instances.txt', '', function() {});

    let worlds = [""]

    let sorts = ["popularity", "heat", "active", "favorites", "magic", "created"]

    await asyncForEach(sorts, async sort => { //SORT THROUGH
        await asyncForEach([0, 100, 200], async offset => { //ALWAYS GO TROUGH 300
            await fetch('https://api.vrchat.cloud/api/1/worlds/?sort=' + sort + '&apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26&n=100&offset=' + offset, { timeout: 5000 })
                .then(res => res.json())
                .then(async json => {
                    let added = 0;
                    await asyncForEach(json, id => {
                        if (!id["occupants"] > 0) return; //CHECK IF INSTANCE IS EMPTY, RETURN IF YES
                        added++
                        worlds.push(id["id"])
                    })
                    console.log(colors.green("SORT: " + sort + " & OFFSET: " + offset + " DONE!, GOT " + added + " Worlds"));
                }).catch(e => { console.log(e); })
        })
    })

    worlds = [...new Set(worlds)].filter(n => n); //REMOVE DUPLICATES AND EMPTY

    //WIP


    await waitFor(60000)
    Start()
}