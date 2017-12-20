import { watchRegisterUser } from './auth';

function* saga(): any {
    yield watchRegisterUser();
}

export default saga;