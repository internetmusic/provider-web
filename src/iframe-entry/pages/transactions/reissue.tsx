import { AddressAvatar } from '@waves.exchange/react-uikit';
import React from 'react';
import { ISignTxProps } from '../../../interface';
import { IReissueWithType } from '@waves/signer';
import { toFormat } from '../../utils';

export default function(props: ISignTxProps<IReissueWithType>) {
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
                <span>Reissue</span>
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
                <span>{tx.quantity}</span>
            </div>
            <div>
                <span>Reissuable</span>
                <span>{tx.reissuable}</span>
            </div>
            <div>
                <span>Fee</span>
                <span>{toFormat(tx.fee, null, props.meta.assets)}</span>
            </div>
            <div>
                <button onClick={props.onCancel}>Cancel</button>
                <button onClick={() => props.onConfirm(tx)}>Ok</button>
            </div>
        </div>
    );
}
