const displayInput = document.querySelector('.input');
const displayResult = document.querySelector('.result');
const keys = document.querySelectorAll('.key');


let result = '';

keys.forEach(key => {
    key.addEventListener('click', ()=> {
        const value = key.dataset.key;

        switch(value) {
            case 'clear':
                result = '';
                displayResult.textContent = result;
                break;
            case 'delete':
                result = result.slice(0,-1);
                break;
            case '=':
                try {
                    result = eval(result);
                    displayInput.textContent = '';
                    displayResult.textContent = result;
                    return result;
                } catch (e) {
                    displayResult.textContent = 'Invalid Math Expression';
                }
                break;
            default:
                result += value;
        }
        updateInputDisplay();
    })
})


function formatInputValue(inputValue) {
    return inputValue
        .replace(/\*/g, ' x ')
        .replace(/\//g, ' / ')
        .replace(/\+/g, ' + ')
        .replace(/-/g, ' - ')
        .replace(/\/ 100/g, '%');
}

function updateInputDisplay() {
    const formattedInputValue = formatInputValue(result);
    displayInput.textContent = formattedInputValue;
}

document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        try {
            result = eval(result);
            displayInput.textContent = '';
            displayResult.textContent = result;
            result = '';
        } catch (e) {
            displayResult.textContent = 'Invalid Math Expression';
        }
    }
    if(e.key === 'Escape') {
        result = '';
        displayInput.textContent = result;
        displayResult.textContent = result;
    }
    else {
        const key = document.querySelector(`.key[data-key="${e.key}"]`);
        if (key) {
            key.click();
        }
    }
});