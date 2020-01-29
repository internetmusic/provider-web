import {
    FeeOption,
    Flex,
    Tab,
    TabPanel,
    TabPanels,
    Tabs,
    TabsList,
    Text,
    AddressAvatar,
} from '@waves.exchange/react-uikit';
import { ITransferWithType, TLong } from '@waves/signer';
import { ITransferTransaction, IWithId } from '@waves/ts-types';
import React, { FC, MouseEventHandler } from 'react';
import { Confirmation } from '../../components/Confirmation';
import {
    IconTransfer,
    IconTransferType,
} from '../../components/IconTransfer/IconTransfer';
import { TransactionDetails } from '../../components/TransactionDetails/TransactionDetails';
import { TransactionJson } from '../../components/TransactionJson/TransactionJson';
import { IMeta } from '../../services/transactionsService';
import { FeeSelect, FeeSelectHandler } from '../../components/FeeList/FeeList';

type Props = {
    userAddress: string;
    userName: string;
    userBalance: string;
    transferAmount: string;
    attachement: string;
    transferFee: string;
    recipientAddress: string;
    recipientName: string;
    iconType: IconTransferType;
    tx: ITransferTransaction<TLong> & IWithId;
    meta: IMeta<ITransferWithType<TLong>>;
    onReject: MouseEventHandler<HTMLButtonElement>;
    onConfirm: MouseEventHandler<HTMLButtonElement>;
    handleFeeSelect: FeeSelectHandler;
};

export const SignTransfer: FC<Props> = ({
    recipientAddress,
    recipientName,
    userAddress,
    userBalance,
    userName,
    attachement,
    transferAmount,
    iconType,
    tx,
    meta,
    onReject,
    onConfirm,
    handleFeeSelect,
}) => (
    <Confirmation
        address={userAddress}
        name={userName}
        balance={userBalance}
        onReject={onReject}
        onConfirm={onConfirm}
    >
        <Flex px="$40" py="$30" bg="main.$900">
            <Flex
                alignItems="center"
                justifyContent="center"
                borderRadius="circle"
                bg="rgba(255, 175, 0, 0.1)"
                height={60}
                width={60}
            >
                <IconTransfer type={iconType} size={40} />
            </Flex>
            <Flex ml="$20" flexDirection="column">
                <Text variant="body1" color="basic.$500">
                    Sign Transfer TX
                </Text>
                <Text fontSize={26} lineHeight="32px" color="standard.$0">
                    {transferAmount}
                </Text>
            </Flex>
        </Flex>

        <Tabs px="$40">
            <TabsList borderBottom="1px solid" borderColor="main.$700" mb="$30">
                <Tab mr="32px" pb="12px">
                    <Text variant="body1">Main</Text>
                </Tab>
                <Tab mr="32px" pb="12px">
                    <Text variant="body1">Details</Text>
                </Tab>
                <Tab mr="32px" pb="12px">
                    <Text variant="body1">JSON</Text>
                </Tab>
            </TabsList>

            <Flex
                mb="$30"
                flexDirection="column"
                bg="main.$800"
                borderTop="1px solid"
                borderTopColor="basic.$1000"
            >
                <TabPanels>
                    <TabPanel>
                        <Flex
                            flexDirection="column"
                            bg="main.$800"
                            borderTop="1px solid"
                            borderTopColor="basic.$1000"
                        >
                            <Text variant="body2" color="basic.$500">
                                Recipient
                            </Text>

                            <AddressAvatar
                                address={recipientAddress}
                                name={userName}
                                alias={recipientName}
                                addressWithCopy={true}
                            />

                            {attachement ? (
                                <>
                                    <Text
                                        mt="$20"
                                        variant="body2"
                                        color="basic.$500"
                                    >
                                        Attachment
                                    </Text>

                                    <Text
                                        mt="$5"
                                        p="15px"
                                        variant="body2"
                                        color="standard.$0"
                                        bg="basic.$900"
                                        borderRadius="$4"
                                    >
                                        {attachement}
                                    </Text>
                                </>
                            ) : null}

                            <FeeSelect
                                mt="$20"
                                txMeta={meta}
                                fee={tx.fee}
                                feeAssetId={tx.feeAssetId}
                                onFeeSelect={handleFeeSelect}
                                isDisabled={meta.feeList.length === 0}
                            />
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <TransactionDetails tx={tx} />
                    </TabPanel>
                    <TabPanel>
                        <TransactionJson tx={tx} />
                    </TabPanel>
                </TabPanels>
            </Flex>
        </Tabs>
    </Confirmation>
);
