'use client';

import { claimTo, getNFT } from "thirdweb/extensions/erc1155";
import { MediaRenderer, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { ERC1155Contract } from "../utils/contracts";
import { client } from "@/app/client";

type ERC1155CardProps = {
    tokenId: bigint;
};

export const Claim1155Card = ({ tokenId }: ERC1155CardProps) => {
    const account = useActiveAccount();

    const { data: nft } = useReadContract(
        getNFT,
        {
            contract: ERC1155Contract,
            tokenId: BigInt(tokenId),
        }
    );

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            backgroundColor: "#333",
            borderRadius: "8px",
            margin: "8px",
            maxWidth: "30%"
        }}>
            <MediaRenderer
                client={client}
                src={nft?.metadata.image}
                style={{
                    width: "100%",
                    height: "auto",
                }}
            />
            <TransactionButton
                transaction={() => (
                    claimTo({
                        contract: ERC1155Contract,
                        to: account?.address || "",
                        tokenId: tokenId,
                        quantity: BigInt(1),
                    })
                )}
                onTransactionConfirmed={() => alert("Claimed ERC-1155")}
            >Claim NFT</TransactionButton>
        </div>
    )
};