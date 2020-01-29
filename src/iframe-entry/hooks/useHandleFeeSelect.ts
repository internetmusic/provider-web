import { useCallback } from 'react';
import { FeeSelectHandler } from '../components/FeeList/FeeList';
import {
    ITransferTransaction,
    IWithId,
    IInvokeScriptTransaction,
} from '@waves/ts-types';
import { TLong } from '@waves/signer';

type Tx =
    | (ITransferTransaction<TLong> & IWithId)
    | (IInvokeScriptTransaction<TLong> & IWithId);

export const useHandleFeeSelect = (tx: Tx): FeeSelectHandler =>
    useCallback<FeeSelectHandler>(
        (fee, feeAssetId) => {
            tx.fee = fee;
            tx.feeAssetId = feeAssetId;
        },
        [tx.fee, tx.feeAssetId]
    );
