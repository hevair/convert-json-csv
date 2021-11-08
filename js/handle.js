
const fileInput = document.getElementById('input-file')
fileInput.addEventListener('change', handleInputFileChange)

const output = document.querySelector('.output-text textarea')
const jsonType = 'application/json'
const csvType = 'text/csv'
let fileContent = '';
let fileFinalType = '';

if (fileContent != "") {
    DataInput.value = fileContent
}


function handleConvertJSONtoCsv() {
    const textJSON = document.getElementById('inputText')
    let JSONToObject = null

    try {
        JSONToObject = JSON.parse(textJSON.value)
    } catch (error) {
        console.log('Format JSON invalid')
        return
    }

    if (!Array.isArray(JSONToObject)) {
        console.log('Não é array', JSONToObject)
        JSONToObject = [JSONToObject]
    }

    output.value = arrayToCSV(JSONToObject)

    fileFinalType = csvType
}

function arrayToCSV(data) {
    csv = data.map(row => Object.values(row))
    csv.unshift(Object.keys(data[0]))
    return csv.join('\n')
}


function handleConverCsvToJSON() {
    const textJSON = document.getElementById('inputText')

    output.value = csvJSON(textJSON.value)
    fileFinalType = jsonType
}


//var csv is the CSV file with headers
function csvJSON(csv) {

    var lines = csv.split("\n")
    var result = []

    var headers = lines[0].split(",")

    for (var i = 1; i < lines.length; i++) {

        var obj = {}
        var currentline = lines[i].split(",")

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j]
        }

        result.push(obj)
    }

    return JSON.stringify(result) //JSON
}


function handleUploadButton() {
    fileInput.click()
}


async function handleInputFileChange(e) {
    const file = e.target.files[0]

    const data = await ReadContetFile(file)

    const DataInput = document.getElementById('inputText')

    DataInput.value = data

}

function ReadContetFile(file) {
    const fileReader = new FileReader()
    return new Promise(function (resolve, reject) {
        fileReader.addEventListener('load', function (e) {
            fileContent = String(e.target.result).trim()

            resolve(fileContent)
        })

        fileReader.readAsText(file)
    });
}

function handleSaveFile() {
    const outputValue = String(output.value).trim()

    if (!outputValue.length) return

    // download file type
    fileFinalType = fileFinalType === csvType ? csvType : jsonType;

    const type = `${fileFinalType};charset=utf-8`
    const fileExtension = fileFinalType.split('/')[1]
    const fileName = `JSVConverter.${fileExtension}`
    const blob = new Blob([outputValue], { type })
    const a = document.createElement('a')
    const url = URL.createObjectURL(blob)

    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()

    // clearFields();

    setTimeout(() => {
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
    }, 0)
}

function handleClean() {
    output.value = ''
    fileFinalType = ''
}

function handleCopy() {
    const copyText = output.value
    console.log('copyText', copyText)
    output.select()
    document.execCommand('copy')  
}