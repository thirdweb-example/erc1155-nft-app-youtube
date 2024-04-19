import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";

const ERC1155ContractAddress = "<contract_address>";

export const ERC1155Contract = getContract({
    client: client,
    chain: chain,
    address: ERC1155ContractAddress,
});