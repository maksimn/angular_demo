import * as React from 'react';
import ValidationFieldError from '../../../app/validate/ValidationFieldError';

export interface ValidationErrorsProps {
    validationErrors: ValidationFieldError[];
}

const ValidationErrors: React.SFC<ValidationErrorsProps> = (props) => {
    const { validationErrors } = props;

    const validationErrorsView = validationErrors.map((ve, ind) =>
        (<div key={ ind }>* {ve.errorMessage}</div>)
    );

    const isHidden = validationErrors.length === 0;

    return (
        <div id="validationErrors" className={`alert alert-danger ${isHidden ? 'hidden' : ''}`}>
            {validationErrorsView}
        </div>
    );
};

export default ValidationErrors;