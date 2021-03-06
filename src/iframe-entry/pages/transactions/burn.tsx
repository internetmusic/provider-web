// @ts-nocheck
import { ISignTxProps } from '../../../interface';
import { IBurnWithType } from '@waves/signer';
import { toFormat } from '../../utils';
import React from 'react';
import { AddressAvatar } from '@waves.exchange/react-uikit';

export default function(props: ISignTxProps<IBurnWithType>) {
    const tx = props.tx;

    return (
        <div>
            <div onClick={props.onCancel} />
            <div className="logo" />
            <div>Confirm TX</div>
            <div>
                <span>Sign from</span>
                <span>
                    <AddressAvatar address={props.user.address} />
                </span>
            </div>
            <div>
                <span>Type</span>
                <span>Burn</span>
            </div>
            <div>
                <span>Id</span>
                <span>{tx.id}</span>
            </div>
            <div>
                <span>Asset</span>
                <span>{tx.assetId}</span>
            </div>
            <div>
                <span>Quantity</span>
                <span>
                    {toFormat(tx.quantity, tx.assetId, props.meta.assets)}
                </span>
            </div>
            <div>
                <span>Fee</span>
                <span>{tx.fee} penny of WAVES</span>
            </div>
            <div>
                <button onClick={props.onCancel}>Cancel</button>
                <button onClick={() => props.onConfirm(tx)}>Ok</button>
            </div>
        </div>
    );
}
