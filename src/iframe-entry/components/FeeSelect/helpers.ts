import { TLong, TTransactionParamWithType } from '@waves/signer';
import BigNumber from '@waves/bignumber';
import { FeeOption } from '@waves.exchange/react-uikit';
import { IMeta } from '../../services/transactionsService';
import { assetPropFactory } from '../../utils/assetPropFactory';
import { WAVES } from '../../constants';
import { getPrintableNumber } from '../../utils/math';
import { DetailsWithLogo } from '../../utils/loadLogoInfo';

export const checkIsEnoughBalance = (balance: TLong, fee: TLong): boolean => {
    return BigNumber.toBigNumber(balance).gte(
        BigNumber.toBigNumber(fee).div(Math.pow(10, WAVES.decimals))
    );
};

const isFeeAssetId = (
    feeAssetId: string | null | undefined
): feeAssetId is string | null => typeof feeAssetId !== 'undefined';

const isNonDefaultFeeAssetId = (
    feeAssetId: string | null | undefined
): feeAssetId is string => typeof feeAssetId === 'string';

export const formatFee = (fee: TLong, feeAsset: DetailsWithLogo): string =>
    getPrintableNumber(fee, feeAsset.decimals);

export const getFeeOptions = (
    txFee: TLong,
    txMeta: IMeta<TTransactionParamWithType>,
    txFeeAssetId: string | null | undefined,
    availableWavesBalance: TLong
): FeeOption[] => {
    const getAssetProp = assetPropFactory(txMeta.assets);
    const wavesFeeOption: FeeOption = {
        id: null,
        name: WAVES.name,
        ticker: WAVES.ticker,
        value: formatFee(txFee, WAVES),
    };

    let defaultFeeOption: FeeOption;
    let feeAsset: DetailsWithLogo;

    if (isFeeAssetId(txFeeAssetId)) {
        if (isNonDefaultFeeAssetId(txFeeAssetId)) {
            // case feeAssetId - some asset, but not Waves
            feeAsset = txMeta.assets[txFeeAssetId];
            defaultFeeOption = {
                name: getAssetProp(txFeeAssetId, 'name'),
                id: txFeeAssetId,
                ticker: '',
                value: formatFee(txFee, feeAsset),
            };
        } else {
            // case: feeAssetId - Waves
            defaultFeeOption = wavesFeeOption;
        }

        // in case feeAssetId provided we can only use it
        return [defaultFeeOption];
    }
    // case: no feeAssetId provided
    // feeAsset = WAVES;
    defaultFeeOption = wavesFeeOption;

    const metaFeeOptions = txMeta.feeList.map((f) => ({
        name: getAssetProp(f.feeAssetId, 'name'),
        id: String(f.feeAssetId),
        ticker: '',
        value: String(f.feeAmount),
    }));

    const isEnoughBalance = checkIsEnoughBalance(availableWavesBalance, txFee);
    const hasNonDefaultFees = metaFeeOptions.length > 0;

    let feeOptions;

    if (hasNonDefaultFees) {
        feeOptions = isEnoughBalance
            ? [defaultFeeOption].concat(metaFeeOptions)
            : metaFeeOptions;
    } else {
        feeOptions = [defaultFeeOption];
    }

    return feeOptions;
};
