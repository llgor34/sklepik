var pdf = require("pdf-creator-node");
var fs = require("fs");

var html = fs.readFileSync("template.html", "utf8");

var options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center">Author: Grzegorz Studniarz</div>'
    },
    footer: {
        height: "28mm",
        contents: {
            first: "Cover page",
            2: "Second page",
            default: '<span style="color: #444">{{page}}</span>/<span>{{pages}}</span>',
            last: "Last Page"
        }
    }
};

var users = [
    {
        name: "Grzegorz",
        age: "17"
    }, {
        name: "Mateusz",
        age: "17"
    } , {
        name: "Sebastian",
        age: "17"
    }, {
        name: "Igor",
        age: "17"
    }
];

    pdf
    .create(html, options)
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.error(error);
    });
