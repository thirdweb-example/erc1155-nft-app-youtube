'use client';

import { getOwnedNFTs } from "thirdweb/extensions/erc1155";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { ERC1155Contract } from "../utils/contracts";

export const Owned1155 = () => {
    const account = useActiveAccount();

    const { data: ownedNFTs, isLoading } = useReadContract(
        getOwnedNFTs,
        {
            contract: ERC1155Contract,
            start: 0,
            address: account?.address || "",
        }
    );
    
    return (
        <div style={{ textAlign: "center" }}>
            <p>Owned NFTs:</p>
            <div style={{
                display: "flex",
                flexDirection: "row",
            }}>
            {isLoading ? (
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
                                maxWidth: "30%"
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
    )
};