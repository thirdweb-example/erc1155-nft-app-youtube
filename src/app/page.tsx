import { ConnectButton } from "@/app/thirdweb";
import styles from "./page.module.css";
import { chain } from "./chain";
import { client } from "./client";
import { Claim1155 } from "../../components/Claim1155";

export default function Home() {
  return (
    <main className={styles.main}>
      <ConnectButton 
        client={client}
        chain={chain}
      />
      <Claim1155 />
    </main>
  );
}
