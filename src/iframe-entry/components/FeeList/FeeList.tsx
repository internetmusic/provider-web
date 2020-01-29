import React, { FC, ReactElement, useState, useCallback } from 'react';
import {
    Box,
    BoxProps,
    Text,
    Select,
    Selected,
    List,
    FeeOption,
} from '@waves.exchange/react-uikit';
import { WAVES } from '../../constants';
import { TLong, TTransactionParamWithType } from '@waves/signer';
import { assetPropFactory } from '../../utils/assetPropFactory';
import { getPrintableNumber, getCoins } from '../../utils/math';
import { IMeta } from '../../services/transactionsService';

export type FeeSelectHandler = (fee: string, feeAssetId: string) => void;

type Props = {
    txMeta: IMeta<TTransactionParamWithType>;
    fee: TLong;
    onFeeSelect: FeeSelectHandler;
    isDisabled: boolean;
    feeAssetId?: string | null;
};

export const FeeSelect: FC<Props & BoxProps> = ({
    txMeta,
    fee: txFee,
    feeAssetId,
    onFeeSelect,
    isDisabled,
    ...rest
}) => {
    const getAssetProp = assetPropFactory(txMeta.assets);
    const feeAsset = txMeta.assets[feeAssetId || ''] || WAVES;

    const fee = getPrintableNumber(txFee, feeAsset.decimals);

    const defaultFee: FeeOption = {
        id: WAVES.assetId,
        name: WAVES.name,
        ticker: WAVES.ticker,
        value: fee,
    };

    const feeList = [defaultFee].concat(
        txMeta.feeList.map((f) => ({
            name: getAssetProp(f.feeAssetId, 'name'),
            id: String(f.feeAssetId),
            ticker: '',
            value: String(f.feeAmount),
        }))
    );

    const [selectedFee, setSelectedFee] = useState<FeeOption>(defaultFee);

    const handleFeeSelect = useCallback(
        (feeOption: FeeOption) => {
            setSelectedFee(feeOption);

            const feeAssetId = feeOption.id;
            const fee = getCoins(
                feeOption.value,
                getAssetProp(feeOption.id, 'decimals')
            );

            onFeeSelect(fee, feeAssetId);
        },
        [getAssetProp, onFeeSelect]
    );

    return (
        <Box {...rest}>
            <Text variant="body2" color="basic.$500" display="block">
                Fee
            </Text>
            <Select
                isDisabled={isDisabled}
                placement="top"
                renderSelected={(open): ReactElement => (
                    <Selected selected={selectedFee} opened={open} />
                )}
            >
                <List onSelect={handleFeeSelect} options={feeList} />
            </Select>
        </Box>
    );
};
