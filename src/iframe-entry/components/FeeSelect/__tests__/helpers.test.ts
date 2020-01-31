import * as helpers from '../helpers';
import { WAVES } from '../../../constants';
import { TTransactionParamWithType } from '@waves/signer';
import { IMeta } from '../../../services/transactionsService';
import { RecursivePartial } from '../../../../interface';

type PartialMeta = RecursivePartial<IMeta<TTransactionParamWithType>>;

const wavesFeeAssetId = null;
const notWavesFeeAssetId = 'not_waves_fee_asset_id';
const notWavesAssetName = 'not a waves asset';

describe('getFeeOptions', () => {
    const getFeeMock = jest.spyOn(helpers, 'formatFee');

    describe('feeAssetId provided', () => {
        const txFee = '1000';
        const availableWavesBalance = '1000';
        const txMeta: PartialMeta = {
            assets: {
                [notWavesFeeAssetId]: {
                    name: notWavesAssetName,
                },
            },
        };

        beforeAll(() => {
            getFeeMock.mockReturnValue(txFee);
        });
        afterAll(() => {
            getFeeMock.mockReset();
        });

        describe('feeAssetId !== Waves', () => {
            it('should return asset fee option', () => {
                const feeAssetId = notWavesFeeAssetId;

                const actual = helpers.getFeeOptions(
                    txFee,
                    txMeta as any,
                    feeAssetId,
                    availableWavesBalance
                );

                const expected = [
                    {
                        id: notWavesFeeAssetId,
                        name: notWavesAssetName,
                        value: txFee,
                        ticker: '',
                    },
                ];

                expect(actual).toEqual(expected);
            });
        });

        describe('feeAssetId === Waves', () => {
            it('should return waves fee option', () => {
                const feeAssetId = wavesFeeAssetId;

                const actual = helpers.getFeeOptions(
                    txFee,
                    txMeta as any,
                    feeAssetId,
                    availableWavesBalance
                );

                const expected = [
                    {
                        id: null,
                        name: WAVES.name,
                        value: txFee,
                        ticker: WAVES.ticker,
                    },
                ];

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('feeAssetId is not provided', () => {
        let checkIsEnoughBalanceMock: jest.SpyInstance;

        beforeAll(() => {
            getFeeMock.mockImplementation((fee) => String(fee));
            checkIsEnoughBalanceMock = jest.spyOn(
                helpers,
                'checkIsEnoughBalance'
            );
        });
        afterAll(() => {
            getFeeMock.mockReset();
            checkIsEnoughBalanceMock.mockReset();
        });

        const feeAssetId = undefined;
        const availableWavesBalance = NaN; // Not important in this test, because of the mock below

        describe('meta fee list is not empty', () => {
            describe('not enough waves balance', () => {
                it("doesn't include waves fee option", () => {
                    checkIsEnoughBalanceMock.mockReturnValueOnce(false);

                    const txFee = '2000';
                    const metaFeeAmount = '1000';
                    const metaFeeAssetId = notWavesFeeAssetId;
                    const metaFeeAssetName = notWavesAssetName;

                    const metaFee = {
                        feeAmount: metaFeeAmount,
                        feeAssetId: metaFeeAssetId,
                    };

                    const txMeta: PartialMeta = {
                        feeList: [metaFee],
                        assets: {
                            [metaFeeAssetId]: {
                                name: metaFeeAssetName,
                            },
                        },
                    };

                    const actual = helpers.getFeeOptions(
                        txFee,
                        txMeta as any,
                        feeAssetId,
                        availableWavesBalance
                    );

                    const expected = [
                        {
                            id: metaFeeAssetId,
                            name: metaFeeAssetName,
                            value: String(metaFeeAmount),
                            ticker: '',
                        },
                    ];

                    expect(actual).toEqual(expected);
                });
            });
            describe('enough waves balance', () => {
                it('includes waves fee option', () => {
                    checkIsEnoughBalanceMock.mockReturnValueOnce(true);

                    const txFee = '2000';
                    const metaFeeAmount = '1000';
                    const metaFeeAssetId = notWavesFeeAssetId;
                    const metaFeeAssetName = notWavesAssetName;

                    const metaFee = {
                        feeAmount: metaFeeAmount,
                        feeAssetId: metaFeeAssetId,
                    };
                    const txMeta: PartialMeta = {
                        feeList: [metaFee],
                        assets: {
                            [metaFeeAssetId]: {
                                name: metaFeeAssetName,
                            },
                        },
                    };

                    const actual = helpers.getFeeOptions(
                        txFee,
                        txMeta as any,
                        feeAssetId,
                        availableWavesBalance
                    );

                    const expected = [
                        {
                            id: null,
                            name: WAVES.name,
                            ticker: WAVES.ticker,
                            value: txFee,
                        },
                        {
                            id: metaFeeAssetId,
                            name: metaFeeAssetName,
                            value: String(metaFeeAmount),
                            ticker: '',
                        },
                    ];

                    expect(actual).toEqual(expected);
                });
            });
        });
        describe('meta fee list is empty', () => {
            describe('enough waves balance', () => {
                it('should return only waves fee option', () => {
                    checkIsEnoughBalanceMock.mockReturnValueOnce(true);

                    const txFee = '2000';
                    const txMeta: PartialMeta = {
                        feeList: [],
                    };

                    const actual = helpers.getFeeOptions(
                        txFee,
                        txMeta as any,
                        feeAssetId,
                        availableWavesBalance
                    );

                    const expected = [
                        {
                            id: null,
                            name: WAVES.name,
                            ticker: WAVES.ticker,
                            value: txFee,
                        },
                    ];

                    expect(actual).toEqual(expected);
                });
            });
            describe('not enough waves balance', () => {
                it('should return only waves fee option', () => {
                    checkIsEnoughBalanceMock.mockReturnValueOnce(false);

                    const txFee = '2000';
                    const txMeta: PartialMeta = {
                        feeList: [],
                    };

                    const actual = helpers.getFeeOptions(
                        txFee,
                        txMeta as any,
                        feeAssetId,
                        availableWavesBalance
                    );

                    const expected = [
                        {
                            id: null,
                            name: WAVES.name,
                            ticker: WAVES.ticker,
                            value: txFee,
                        },
                    ];

                    expect(actual).toEqual(expected);
                });
            });
        });
    });
});
