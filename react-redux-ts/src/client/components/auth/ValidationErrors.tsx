import * as React from 'react';
import ValidationErrors from '../../../app/models/ValidationErrors';

export interface ValidationErrorsProps {
    validationErrors: ValidationErrors;
}

const ValidationErrors: React.SFC<ValidationErrorsProps> = (props) => {
    const { validationErrors } = props;

    const validationErrorsView = validationErrors.errors.map((errorMessage, ind) =>
        (<div key={ ind }>* {errorMessage}</div>)
    );

    const isHidden = validationErrors.errors.length === 0;

    return (
        <div id="validationErrors" className={`alert alert-danger ${isHidden ? 'hidden' : ''}`}>
            {validationErrorsView}
        </div>
    );
};

export default ValidationErrors;