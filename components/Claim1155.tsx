'use client';

import { claimTo, getNFTs, getOwnedNFTs } from "thirdweb/extensions/erc1155";
import { MediaRenderer, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { ERC1155Contract } from "../utils/contracts";
import { client } from "@/app/client";

export const Claim1155 = () => {
    const account = useActiveAccount();
    
    const { data: nfts, isLoading: loadingNFTs } = useReadContract(
        getNFTs,
        {
            contract: ERC1155Contract,
            start: 0,
        }
    );

    const { data: ownedNFTs, isLoading: loadingOwnedNFTs, refetch: refetchOwnedNFTs } = useReadContract(
        getOwnedNFTs,
        {
            contract: ERC1155Contract,
            start: 0,
            address: account?.address || "",
        }
    );

    return (
        <div style={{
            textAlign: "center",
        }}>
            {account && (
                <>
                <div 
                    style={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                    {loadingNFTs ? (
                        <p>Loading NFTs...</p>
                    ) : (
                        nfts && nfts.length > 0 ? (
                            nfts.map((nft) => (
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
                                                tokenId: nft.id,
                                                quantity: BigInt(1),
                                            })
                                        )}
                                        onTransactionConfirmed={() => {
                                            alert("Claimed ERC-1155")
                                            refetchOwnedNFTs()
                                        }}
                                    >Claim NFT</TransactionButton>
                                </div>
                            ))
                        ) : (
                            <p>No NFTs found.</p>
                        )
                    )}
                </div>
                <div>
                    <p>Owned NFTs:</p>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        textAlign: "center",
                    }}>
                        {loadingOwnedNFTs ? (
                            <p>Loading NFTs...</p>
                        ) : (
                            ownedNFTs && ownedNFTs.length > 0 ? (
                                ownedNFTs.map((nft) => (
                                    <div key={nft.id}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            padding: "16px",
                                            backgroundColor: "#333",
                                            borderRadius: "8px",
                                            margin: "8px",
                                        }}
                                    >
                                        <p>Token ID: {nft.id.toString()}</p>
                                        <p>Quantity: {nft.quantityOwned.toString()}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No NFTs found.</p>
                            )
                        )}
                    </div>
                </div>
                </>
            )}
        </div>
    )
};