import React, {
    FC,
    MouseEventHandler,
    useState,
    useCallback,
    useEffect,
} from 'react';
import { Confirmation } from '../../components/Confirmation';
import {
    Flex,
    iconInvoke,
    Icon,
    Text,
    Tabs,
    TabsList,
    Tab,
    TabPanel,
    TabPanels,
    AddressAvatar,
    Box,
    Checkbox,
    Label,
} from '@waves.exchange/react-uikit';
import { Help } from '../../components/Help/Help';

type Props = {
    assetId: string;
    assetDescription: string;
    assetType: string;
    assetScript?: string;
    decimals: number;
    userAddress: string;
    userName: string;
    userBalance: string;
    issueAmount: string;
    onReject: MouseEventHandler<HTMLButtonElement>;
    onConfirm: MouseEventHandler<HTMLButtonElement>;
};

export const SignIssueComponent: FC<Props> = ({
    assetId,
    assetDescription,
    assetType,
    assetScript,
    decimals,
    userAddress,
    userName,
    userBalance,
    issueAmount,
    onReject,
    onConfirm,
}) => {
    const [tooltipBoundingEl, setTooltipBoundingEl] = useState();
    const [popperOptions, setPopperOptions] = useState({});

    const anchorRef = useCallback((node) => {
        if (node !== null) {
            setTooltipBoundingEl(node);
        }
    }, []);

    useEffect(
        () =>
            tooltipBoundingEl &&
            setPopperOptions({
                modifiers: [
                    {
                        name: 'preventOverflow',
                        enabled: true,
                        options: {
                            boundary: tooltipBoundingEl,
                            padding: { left: 80, right: 80 },
                        },
                    },
                    {
                        name: 'flip',
                        enabled: false,
                    },
                ],
                strategy: 'fixed',
            }),
        [tooltipBoundingEl]
    );

    return (
        <div ref={anchorRef}>
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
                        bg="rgba(38, 193, 201, 0.1)"
                        height={60}
                        width={60}
                    >
                        <Icon icon={iconInvoke} size={40} color="#26c1c9" />
                    </Flex>
                    <Flex ml="$20" flexDirection="column">
                        <Text variant="body1" color="basic.$500">
                            Sign Issue TX
                        </Text>
                        <Text
                            fontSize={26}
                            lineHeight="32px"
                            color="standard.$0"
                        >
                            {issueAmount}
                        </Text>
                    </Flex>
                </Flex>

                <Tabs px="$40">
                    <TabsList
                        borderBottom="1px solid"
                        borderColor="main.$700"
                        mb="$30"
                    >
                        <Tab mr="32px" pb="12px">
                            <Text variant="body1">Main</Text>
                        </Tab>
                    </TabsList>
                    <TabPanels>
                        <TabPanel>
                            <Flex
                                flexDirection="column"
                                bg="main.$800"
                                borderTop="1px solid"
                                borderTopColor="basic.$1000"
                            >
                                <Text variant="body2" color="basic.$500">
                                    Asset ID
                                </Text>
                                <AddressAvatar
                                    mt="5px"
                                    address={assetId}
                                    isShort={true}
                                    addressWithCopy={true}
                                />
                                {assetDescription ? (
                                    <>
                                        <Text
                                            mt="$20"
                                            variant="body2"
                                            color="basic.$500"
                                        >
                                            Asset Description
                                        </Text>
                                        <Text
                                            display="block"
                                            mt="$5"
                                            p="15px"
                                            variant="body2"
                                            color="standard.$0"
                                            bg="basic.$900"
                                            borderRadius="$4"
                                        >
                                            {assetDescription}
                                        </Text>
                                    </>
                                ) : null}

                                <Flex mt={25}>
                                    <Flex flexDirection="column">
                                        <Flex alignItems="center">
                                            <Text
                                                mt="$25"
                                                mr="3px"
                                                variant="body2"
                                                color="basic.$500"
                                            >
                                                Asset Type
                                            </Text>

                                            <Help popperOptions={popperOptions}>
                                                <Text
                                                    variant="body1"
                                                    fontWeight={700}
                                                    display="block"
                                                >
                                                    This field defines the total
                                                    tokens supply that your
                                                    asset will contain.
                                                </Text>
                                                <Text
                                                    variant="body2"
                                                    display="block"
                                                    mt="5px"
                                                >
                                                    Reissuability allows for
                                                    additional tokens creation
                                                    that will be added to the
                                                    total token supply of asset.
                                                </Text>

                                                <Text
                                                    variant="body2"
                                                    display="block"
                                                    mt="5px"
                                                >
                                                    A non-reissuable asset will
                                                    be permanently limited to
                                                    the total token supply
                                                    defined during this steps.
                                                </Text>
                                            </Help>
                                        </Flex>
                                        <Text
                                            mt="5px"
                                            variant="body2"
                                            color="standard.$0"
                                        >
                                            {assetType}
                                        </Text>
                                    </Flex>
                                    <Flex ml={30} flexDirection="column">
                                        <Flex alignItems="center">
                                            <Text
                                                mt="$25"
                                                mr="3px"
                                                variant="body2"
                                                color="basic.$500"
                                            >
                                                Asset Description
                                            </Text>
                                            <Help popperOptions={popperOptions}>
                                                <Text
                                                    variant="body1"
                                                    fontWeight={700}
                                                >
                                                    This field defines the
                                                    number of decimals your
                                                    asset token will be divided
                                                    in.
                                                </Text>
                                            </Help>
                                        </Flex>
                                        <Text
                                            mt="5px"
                                            variant="body2"
                                            color="standard.$0"
                                        >
                                            {decimals}
                                        </Text>
                                    </Flex>
                                </Flex>

                                {assetScript ? (
                                    <>
                                        <Flex
                                            alignItems="center"
                                            mr="3px"
                                            mt={25}
                                        >
                                            <Text
                                                variant="body2"
                                                color="basic.$500"
                                                mr="3px"
                                            >
                                                Smart Asset Script
                                            </Text>
                                            <Help popperOptions={popperOptions}>
                                                <Text
                                                    display="block"
                                                    variant="body1"
                                                    fontWeight={700}
                                                >
                                                    A Smart Asset is an asset
                                                    with an attached script that
                                                    places conditions on every
                                                    transaction made for the
                                                    token in question.
                                                </Text>
                                                <Text
                                                    display="block"
                                                    variant="body2"
                                                    mt="5px"
                                                >
                                                    Each validation of a
                                                    transaction by a Smart
                                                    Asset's script increases the
                                                    transaction fee by 0.004
                                                    WAVES. For example, if a
                                                    regular tx is made for a
                                                    Smart Asset, the cost is
                                                    0.001 + 0.004 = 0.005 WAVES.
                                                    If an exchange transaction
                                                    is made, the cost is 0.003 +
                                                    0.004 = 0.007 WAVES.
                                                </Text>
                                            </Help>
                                        </Flex>

                                        <Text
                                            display="block"
                                            mt="$5"
                                            p="15px"
                                            variant="body2"
                                            color="standard.$0"
                                            bg="basic.$900"
                                            borderRadius="$4"
                                        >
                                            {assetScript}
                                        </Text>
                                    </>
                                ) : null}
                                <Box
                                    p={15}
                                    border="1px dashed"
                                    borderColor="main.$500"
                                    backgroundColor="main.$800"
                                    mt={20}
                                >
                                    <Text
                                        display="block"
                                        variant="body1"
                                        color="standard.$0"
                                    >
                                        You agree that:
                                    </Text>
                                    <Text
                                        display="block"
                                        mt="5px"
                                        variant="body2"
                                        color="basic.$300"
                                    >
                                        I) You will not use the token for
                                        fraudulent purposes;
                                    </Text>
                                    <Text
                                        display="block"
                                        variant="body2"
                                        color="basic.$300"
                                    >
                                        II) You will not duplicate, fully or in
                                        part, the name of an existing
                                        cryptocurrency or a well-known company
                                        with the aim of misleading users;
                                    </Text>
                                    <Text
                                        display="block"
                                        variant="body2"
                                        color="basic.$300"
                                    >
                                        III) You will not use names of states,
                                        other administrative units or municipal
                                        insitutions for the token's name with
                                        the aim of misleading users;
                                    </Text>
                                    <Text
                                        display="block"
                                        variant="body2"
                                        color="basic.$300"
                                    >
                                        IV) You will not set a script on a smart
                                        asset that limits exchange transactions
                                        on Waves.Exchange by asset quantity;
                                    </Text>
                                    <Text
                                        display="block"
                                        variant="body2"
                                        color="basic.$300"
                                    >
                                        V) You will not give false information
                                        in a smart asset's description
                                        concerning the rules governing the
                                        token's use, which do not correspond to
                                        those of the script installed on it;
                                    </Text>
                                </Box>
                                <Flex alignItems="flex-start" mt={20}>
                                    <Checkbox id="terms" />
                                    <Label
                                        htmlFor="terms"
                                        pl="10px"
                                        color="basic.$500"
                                        textAlign="justify"
                                        fontSize="13px"
                                        lineHeight="18px"
                                    >
                                        I understand that in the case of
                                        non-compliance with the rules, my token
                                        will be categorised as "Suspicious", and
                                        will be available for search only by ID
                                    </Label>
                                </Flex>
                            </Flex>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Confirmation>
        </div>
    );
};
