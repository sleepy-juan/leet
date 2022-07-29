let data;

let url = `https://sheets.googleapis.com/v4/spreadsheets/1C_TU8X55nF4MQQUBfoxbPk2IfFEbP6GHN0N_Te1f2bQ/values/data?key=AIzaSyAGLAwV4t0vj6Fv-yc2uTEfae1-OsTvoA8`;
fetch(url)
    .then((response) => response.json())
    .then((json) => {
        data = json.values;

        let select = document.getElementById("year");
        for (let i = 0; i < data.length; i += 4) {
            let option = document.createElement("option");
            option.innerText = data[i][0];

            select.appendChild(option);
        }
    });

document.getElementById("grading").addEventListener("click", (e) => {
    let year = document.getElementById("year").value;
    let understanding = document.getElementById("understanding").value;
    let reasoning = document.getElementById("reasoning").value;

    let uOrigin = calcUnderstanding(year, [...understanding]);
    let rOrigin = calcReasoning(year, [...reasoning]);
    let uConverted = scoreUnderstanding(year, uOrigin);
    let rConverted = scoreReasoning(year, rOrigin);
    let sOrigin = uOrigin + rOrigin;
    let sConverted = parseFloat(uConverted) + parseFloat(rConverted);

    document.getElementById("uOrigin").innerText = uOrigin;
    document.getElementById("rOrigin").innerText = rOrigin;
    document.getElementById("uConverted").innerText = uConverted;
    document.getElementById("rConverted").innerText = rConverted;
    document.getElementById("sOrigin").innerText = sOrigin;
    document.getElementById("sConverted").innerText = sConverted;
});

function calcUnderstanding(year, answers) {
    let index = (year - 2008) * 4;
    let score = 0;
    answers.forEach((a, i) => {
        if (data[index][i + 1] === a) score++;
    });
    return score;
}

function calcReasoning(year, answers) {
    let index = (year - 2008) * 4;
    let score = 0;
    answers.forEach((a, i) => {
        if (data[index + 2][i + 1] === a) score++;
    });
    return score;
}

function scoreUnderstanding(year, score) {
    let index = (year - 2008) * 4;
    return data[index + 1][score];
}

function scoreReasoning(year, score) {
    let index = (year - 2008) * 4;
    return data[index + 3][score];
}
