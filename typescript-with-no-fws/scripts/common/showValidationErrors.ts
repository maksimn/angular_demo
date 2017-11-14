import ValidationFieldError from '../../app/validate/ValidationFieldError';

export default function showValidationErrors(responseText: string) : void {
    const result = JSON.parse(responseText);
    const validationErrors = <ValidationFieldError[]>result.validationErrors;
    
    const validationErrorsView = document.getElementById('validationErrors');

    validationErrorsView.classList.remove('hidden');
    
    while (validationErrorsView.firstChild) {
        validationErrorsView.removeChild(validationErrorsView.firstChild);
    }

    validationErrors.forEach(err => {
        const singleErrorRow = document.createElement('div');
        singleErrorRow.innerText = `* ${err.errorMessage}`;
        validationErrorsView.appendChild(singleErrorRow);
    });
}