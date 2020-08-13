const postData = async (url='', data={})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
};

const getanalysis = async () => {
    const response = await fetch('http://localhost:8081/analysis');
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log("error", error)
    }
};

const handleSubmit = async()=>{
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkformat(formText);
    console.log("::: Form Submitted :::")
    console.log(`::: Submitted Content ::: ${formText}`)
    try {
        postData('http://localhost:8081/database', {textcontent: formText});
        const result = await getanalysis();
        const test = JSON.parse(result);
        document.getElementById('results').innerHTML = `The input sentence or word has a sentiment score of ${test.score_tag}.`;
        document.getElementById('results_1').innerHTML = `The input sentence or word is more likely to be ${test.irony}.`;
        document.getElementById('results_2').innerHTML = `The input sentence or word has a level of subjectivity of ${test.subjectivity}.`;
        document.getElementById('results_3').innerHTML = `The confidence score of the analysis is ${test.confidence}.`;
    } catch(error) {
        console.log("error", error);
    }
};

export { handleSubmit }
export { postData }
export { getanalysis }