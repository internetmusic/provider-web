import { TPrivateMultiaccountData } from '../services/storage';
import { libs } from '@waves/waves-transactions';
import isValidUsersDataJSON from './isValidUsersDataJSON';

export default (
    users: string,
    hash: string,
    passowrd: string,
    rounds = 5000
): TPrivateMultiaccountData => {
    const json = libs.crypto.decryptSeed(users, passowrd, rounds);

    if (isValidUsersDataJSON(json, hash) === false) {
        throw new Error('Hash does not match!');
    }

    return JSON.parse(json);
};
